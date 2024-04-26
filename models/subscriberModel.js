import mongoose from "mongoose";

const SubscriberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      subscribedToChannel: {
        type: String,
        required: true
      },
      subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
      }
});



const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

export default Subscriber;