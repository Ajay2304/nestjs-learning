import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  private db: any[] = [];

  createUser(name:string,email:string){
    const user ={
      userID:this.db.length+1,
      name,
      email,

    } 
    this.db.push(user);
    
    return user;

  }
  getUsers(){
    console.log(this.db);
    return this.db;
  }

  getById(id:number){
    const user=this.db.find(user=>user.userID===id);
    if(!user){
      return  "User not Found";
    }else{
      return user;
    }
    
  }

  updateUser(ID:number,name:string,email:string){
    const user=this.db.find(user=>user.userID===ID);
    if(!user){
      return  "User not Found";
    }else{
      user.name=name;
      user.email=email;
      return user;
    }
  }
  deleteUser(id: number){
    const userIndex = this.db.findIndex(user=>user.userID===id);
    if(userIndex === -1){
      return  "User not Found";
    }else{
      const deletedUser = this.db[userIndex];
      this.db.splice(userIndex, 1);
      return deletedUser + "This user has been deleted successfully";
      
    }
  }

};