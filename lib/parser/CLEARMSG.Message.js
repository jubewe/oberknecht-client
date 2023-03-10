const { messageCommand, messageContent, messageParameters, messagePrefix } = require("oberknecht-utils");

class clearmsgMessage {
    _raw = String();

    IRCCommand = String();
    IRCParameters = Object();
    IRCMessageParts = Array();

    moderatorLogin = String();

    targetUserName = String();
    targetMessageID = String();
    targetMessageText = String();

    channelName = String() || undefined;
    channelID = String() || undefined;

    serverTimestamp = Date();
    serverTimestampRaw = Number();
    serverDelay = Number();

    /** @param {Symbol} sym @param {string} rawMessage */
    constructor(sym, rawMessage) {
        let i = require("../index");
        const dn = Date.now();

        this._raw = rawMessage;

        this.IRCCommand = messageCommand(rawMessage);
        this.IRCParameters = messageParameters(this._raw);
        this.IRCMessageParts = [...this._raw.split(" ").slice(0, 4), messageContent(this._raw)];
        this.IRCMessagePrefix = messagePrefix(this._raw);

        this.targetMessageID = this.IRCParameters["target-msg-id"];
        this.targetUserName = this.IRCParameters["login"];
        this.targetMessageText = this.IRCMessageParts[4];

        this.channelName = i.utils.cleanChannelName(this.IRCMessageParts[3]);
        this.channelID = this.IRCParameters["room-id"] ?? undefined;

        this.serverTimestampRaw = parseInt(this.IRCParameters["tmi-sent-ts"]);
        this.serverTimestamp = new Date(this.serverTimestampRaw);
        this.serverDelay = (dn - this.serverTimestampRaw);
    };
};

module.exports = clearmsgMessage;