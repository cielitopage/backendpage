
import mongoose from 'mongoose';



interface Options {
    mongoUrl: string;
    dbName: string;  
}


export class MongoStringDB {
    
    static async connect(options: Options) {

        const { mongoUrl, dbName } = options;

       try {
        await mongoose.connect(mongoUrl, {        
            dbName: dbName
        });
        console.log('Connected to MongoDB');
        return true;
       
       }
         catch(err) {
          console.log('Error connecting to MongoDB');
          console.log(err);
          throw err;
         }

    }

}