const { storage } = require("../config/firebase.config");
const { getDownloadURL, ref, uploadBytes } = require("@firebase/storage");
const twilio = require('twilio');
require("dotenv").config()
const accountSid =process.env.accountSid;
const authToken =process.env.authToken;
const twilioPhoneNumber =process.env.twilioPhoneNumber;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

module.exports = {
    uploadFile: (async (file) => {
        console.log(file, 'file')
        const uniqueFilename = `${file.originalname}-${Date.now()}`;
        const storageRef = ref(storage, `${uniqueFilename}`);
        await uploadBytes(storageRef, file.buffer);
        const result = await getDownloadURL(storageRef);
        let downloadUrl = result;
        return downloadUrl
    }),
    sendOtp: async (phoneNumber, otp) => {
        console.log(phoneNumber,otp,'console add ed in send otp')
        try {
            const message = await client.messages.create({ body: `Your OTP is: ${otp}`, from: twilioPhoneNumber, to: phoneNumber, });
            console.log('Message sent:', message.sid);
            return { success: true, sid: message.sid };
        }
        catch (error) {
            console.error('Error sending OTP:', error);
            return { success: false, error: error.message };
        }
    },
    generatePin: () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
}
