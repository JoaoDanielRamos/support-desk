import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // @ts-ignore
    const connect = mongoose.connect(process.env.MONGO_URI);
    // @ts-ignore
    console.log(`DB Connected`.cyan.underline);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB };
