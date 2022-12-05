import { useEffect, useRef, useState } from "react";
import apiRequests from "./apiRequests"
import useRequest from "./hooks/useRequest";

function Cart(){
    const [produqtebi, setProduqtebi] = useState([])
    const [value, setValue] = useState('')
    const inputRef = useRef()  

    //ჩვენ მიერ შექნილი ჰუკის არგუმენტად აიღებს იმ პარამეტრებს რასაც ვაწვდიდით useEffectში
    const [data] = useRequest('GET', "/users?page=1")  
    
    console.log(data);
    
    //თუ ისევ პროდუქტების დამეპვას ვაპირებთ, მაშინ შესაბამის სთეითს უნდა გადავცეთ სერვერიდან დაბრუნებული ამსივი - datა,
    //რომელსაც აქვს ორი მდგოამრეობა, სანამ ჩაიტვირთება ცარიელი მასივია , როგორც კი ჩაიტვირთება მოაქვს ინფორმაცია.
    //ამიტომ useEffectში სეგვიძლია დავიჭიროთ და გადავცეთ სასურველ სთეითს. 
    useEffect(() =>{
        if(data){
            setProduqtebi(data)
        }
    },[data]) //აუცილებელია ეს ეფექტი გაეშვას იმდენჯერ რამდენჯერაც დატა ჩაიტვირთება

    useEffect(() =>{
        inputRef.current.focus();
    }, [])


    function damateba(e){
        e.preventDefault();
        const newItems = [
            ...produqtebi,
            {
                first_name: value,
                last_name: ""

            },
        ]
        setProduqtebi(newItems)
        setValue("")

        apiRequests("POST","/users",{
            "name": value
        }).then(response => console.log(response.data) )
        .catch(error => console.log(error))   
    }
    function removeItem(itemId){
        const newItems = produqtebi.filter(item => item.id !== itemId)
        setProduqtebi(newItems);
    }
    return <div  className="friends">
        <form action ="" onSubmit={damateba}>
            <input 
            type="text" 
            value={value} 
            onChange={e => setValue(e.target.value)}
            ref ={inputRef}
            />
        </form>
        <ul>
        {
        produqtebi.map(item =>( 
            <li key={item.id}  > 
               {item.first_name+ " "+ item.last_name}
               <button onClick={() => removeItem(item.id)}> Remove</button> 
            </li>   
        ))
        }
        </ul>
        
    </div>
}

export default Cart;

