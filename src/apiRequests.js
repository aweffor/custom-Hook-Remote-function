//მოცემული ლოგიკა არ არის რეაქტის კომპონენტი. უბრალოდ ფუნქცია გავაქვს ცალკე
import axios from "axios";

//ფუნქცია სშეგიძლიათ განსაზღვრისას დააექსპორტოთ
export default function apiRequests(method,endpoint, data,headers ={}){ 
    // ჰედერი შეგიძლიათ დეფოლტად ცარიელი ობიექტი შექმნათ ან მიაბათ რენდომს
    const defaultHEader = {
        Verified : "uniqueVerif" // ჰედერებს ვაყოლებთ ან რენდომად დაგენერირებულ სტრინგს ან რაღაც ლოგიკის დაცვით. 
        //უმჯობესია რეალურ იუზერებთან მუშაობის დროს ყველა ჰედერი იყოს უნიკალური
    }
    //აქსიოსი შეგიძლიათ გამოიყენოთ მეთოდების გარეშეც, დეტალები უნდა იყოს აღწერილი შიდა ობიექტში
    return axios({
        url:"https://reqres.in/api"+ endpoint,
        method,
        data,
        headers : {... defaultHEader,...headers}

})
}