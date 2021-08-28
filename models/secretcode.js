const mongoose=require('mongoose');
const secretCode = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: '10h' } }
});
const token=mongoose.model('SecretCode',secretCode);
module.exports=token; 