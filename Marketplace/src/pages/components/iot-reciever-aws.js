import React, { Component } from 'react';

class IotReciever extends Component {

    constructor(props) {
        super(props);
        this.mqttClient = ""
    }

    componentDidMount() {

        var AWS = require('aws-sdk');
        var AWSIoTData = require('aws-iot-device-sdk');
        var AWSConfiguration = require('./aws-configuration.js');

        AWS.config.region = AWSConfiguration.region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: AWSConfiguration.poolId });
        var cognitoIdentity = new AWS.CognitoIdentity();
        AWS.config.credentials.get( (err, data) => {
            if (!err) {
                var params = { IdentityId: AWS.config.credentials.identityId };
                cognitoIdentity.getCredentialsForIdentity(params, (err, data) => {
                    if (!err) { this.mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId, data.Credentials.SecretKey, data.Credentials.SessionToken); }
                    else {
                        console.log('error retrieving credentials: ');
                        alert('error retrieving credentials: ');
                    }
                });
            }
            else { console.log('error retrieving identity:'); }
        });

        var messageHistory = '';
        var refresh = 0;
        var clientId = 'mqtt-explorer-' + (Math.floor((Math.random() * 100000) + 1));

        this.mqttClient = AWSIoTData.device({
            region: AWS.config.region,
            host: AWSConfiguration.host,
            clientId: clientId,
            protocol: 'wss',
            maximumReconnectTimeMs: 1000,
            debug: true,
            accessKeyId: '',
            secretKey: '',
            sessionToken: ''
        });

        window.mqttClientConnectHandler = () => {
            console.clear();
            console.log("Connected")
            console.log(this.props.sub_topics)
            for (let i = 0; i < this.props.sub_topics.length; i++) {
                console.log("Sub:" + this.props.sub_topics[i])
                this.mqttClient.subscribe(this.props.sub_topics[i]);
            }
            messageHistory = '';
        }

        window.mqttClientReconnectHandler = () => {
            console.log('reconnect : times : ' + refresh.toString());
        };

        window.mqttClientMessageHandler = (topic, payload) => {
            for (let i = 0; i < this.props.sub_topics.length; i++) {
                if (topic === this.props.sub_topics[i]) {
                    messageHistory = payload.toString()
                    this.props.callback([topic, messageHistory])
                }
            }
            messageHistory = "";
        }

        window.updateSubscriptionTopic = function () {

        };

        window.clearHistory = () => {
            if (1 === true) {
                messageHistory = '';
            }
        };

        window.updatePublishTopic = () => { };

        window.updatePublishData = () => {

        };

        this.mqttClient.on('connect', window.mqttClientConnectHandler);
        this.mqttClient.on('reconnect', window.mqttClientReconnectHandler);
        this.mqttClient.on('message', window.mqttClientMessageHandler);
        this.mqttClient.on('close', () => {
            console.log('close');
        });
        this.mqttClient.on('offline', () => {
            console.log('offline');
        });
        this.mqttClient.on('error', (error) => {
            //console.log('error', error);
        });
    }

    componentWillUnmount() {
        this.mqttClient.end();
    }

    render() {
        return (
            <>
            </>
        );
    }
}


export default IotReciever;