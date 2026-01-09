const mongooose = require("mongoose");


/** Notification Schema */
const notificationSchema = new mongooose.Schema({
    
    /** notifier */
    recipient_id : {
        type:mongooose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    /** Notification type */
    type : {
        type:String,
        enum:[
            'ITEM_LIKED', 
            'NEW_MESSAGE', 
            'ORDER_SHIPPED', 
            'PRICE_DROP',
            'FOLLOWED_YOU',
            "UNFOLLOWED_YOU"
        ],
        required:true,
    },

    /** Notification status */
    status : {
        type:String,
        enum:["UNREAD","READ"],
        default:"UNREAD"
    },

    /** Meta data object */
    metaData : {
        type:mongooose.Schema.Types.Mixed,
        required:true,
    },

    /** Link url */
    linkUrl : {
        type: String,
        required: true
    }
},{timestamps:true});

/* index **/
notificationSchema.index({
    recipient_id: 1, 
    created_at: -1, 
    status: 1
});

/** Notification Model */
const notificatioModel = mongooose.model("Notification",notificationSchema);

module.exports = notificatioModel;