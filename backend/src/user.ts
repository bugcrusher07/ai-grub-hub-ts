import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
export interface IGuest extends Document{
  uuid:string,
  tokens:number,
  lastActive?:Date,
  isAnonymous:boolean,
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  subscription: string; // Add this
  tokens: number; // Add this
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: { type: String, default: 'free' }, // Add this with default value
    tokens: { type: Number, default: 200 }, // Add this with default value
  },
  {
    timestamps: true,
  }
);
const GuestSchema = new Schema<IGuest>(
  {
    uuid: { type: String, required: true, unique: true },
    tokens: { type: Number, default: 200 },
    lastActive: { type: Date, default: Date.now },
    isAnonymous:{type:Boolean,default:true},
  },
  { timestamps: true } // This adds createdAt and updatedAt automatically

)
// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
export const GuestUser = mongoose.model<IGuest>("GuestUser",GuestSchema);
