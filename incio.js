var imagen_animada = document.getElementById("imagen_animada")
var change = true
setInterval(()=>{
    if(change){
        imagen_animada.src = "./assets/mono_aguacate_2.png"
        change = false
    }else{
        imagen_animada.src = "./assets/mono_aguacate.png"
        change = true
    }
},1000)

var principal_box = document.querySelector("#principal_box")

var hider_button_img = document.getElementById("img")
var special_input = document.getElementById("special_input")
var body = document.getElementById("body_password")
var head = document.getElementById("head_password")


var hider_button = document.querySelector("#hider_button")
var submit_password = document.querySelector("#submit_password")
var mega_box = document.querySelector("#mega_box")

var to_hide_password = true
var correct_bug = true
var saving = ""

var opacity1 = 0
var opacity2 = 0


var start = true

var database = firebase.database()

setInterval(()=>{
    if(to_hide_password){
        special_input.type = "password"
        saving = special_input.value
        special_input.value = ""
        special_input.value = saving
              
    }else{
        special_input.type = "text"
        correct_bug = true
    }

    if(opacity1 <= 1){
        opacity1+=0.01
        mega_box.style.opacity = opacity1
    }

    if(!start){
        deleting()
        if(count > 1){
            if(opacity2 <= 1){
                opacity2+=0.01
                firstDiv.style.opacity = opacity2
            }
        }else{
            if(opacity2 <= 1){
                opacity2+=0.01
                firstDiv1.style.opacity = opacity2
            }
        }
    }
    
},10)

hider_button.addEventListener("click", ()=>{
    if(to_hide_password){
        to_hide_password = false
        hider_button_img.src = "./assets/candado_a.png"
    }else{
        to_hide_password = true
        hider_button_img.src = "./assets/candado_c.png"
    }
})
submit_password.addEventListener("click", async ()=>{
    database.ref("/Contraseña").on("value", (s)=>{
        console.log(s.val())
        if(saving === s.val()){
            alert("yei")
            mega_box.remove()
            next_section_start()

        }else{
            alert("bad")
            body.style.borderColor = "brown"
            head.style.borderColor = "brown"
        }
    })
    
})

var count = 1
var context = []
var botones = []
var nombres = []
var firstDiv
var firstDiv1

function next_section_start(){
    database.ref("/pedido").on("value", (s)=>{
        if(start){
            for(data in s.val()){
                context.push(s.val()[data])
                var info = s.val()[data]
                var name = info["Cliente"]
                nombres.push(name)
                var title = document.createElement("h1")
                firstDiv = document.createElement("div")
                var buttonD = document.createElement("button")
                var secondDiv =  document.createElement("div")
                var thridDiv= document.createElement("div")

                title.textContent = name
                title.style.marginRight = "5%"
                firstDiv.style.margin = "5%"
                firstDiv.style.borderLeft = "3px solid white" 
                firstDiv.style.marginBottom = "2%"
                thridDiv.style.marginLeft = "1%"
                secondDiv.style.marginLeft = "1%"

                buttonD.setAttribute("class", "buttons")
                buttonD.setAttribute("id", `button_s_${count}`)
                buttonD.style.width = "10%"
                var p1 = document.createElement("h1")
                p1.textContent = "X"
                buttonD.appendChild(p1)

                botones.push(buttonD)

                secondDiv.setAttribute("class", "row_boxes")

                secondDiv.appendChild(title)
                secondDiv.appendChild(buttonD)

                for(i in info){
                    var info2 = info[i]
                    var ps = document.createElement("p")
                    ps.textContent = `- ${i}: ${info2}`
                    thridDiv.appendChild(ps)
                }
                firstDiv.appendChild(secondDiv)
                firstDiv.appendChild(thridDiv)

                principal_box.appendChild(firstDiv)
                count+=1
            }
            start = false
            if(s.val() === null){
                var firstDiv1 = document.createElement("div")
                var img = document.createElement("img")

                img.setAttribute("src", "./assets/Imagen4.png")
                img.style.width = "30%"
                firstDiv1.style.display = "flex"
                firstDiv1.style.justifyContent = "center"

                firstDiv1.appendChild(img)
                principal_box.appendChild(firstDiv1)
            }
        }
    
    })
}

var once1 = true 
function deleting(){
    once1 = true
    for(var i = 0; i < botones.length; i++){
        //console.log(i)

        botones[i].addEventListener("click", (e)=>{
            if(once1){
                var x = parseInt(e.target.id.split("_")[2])-1
                database.ref(`/pedido/${nombres[x]}`).remove()
                botones[x].style.borderColor = "brown"

                console.log(nombres[x])
                once1 = false
            }
        })
    }
}

document.addEventListener("touchend", ()=>{
    var sound = new Audio("./assets/water-droplet-2-165634.mp3")
    sound.load()
    sound.play() 
})
document.addEventListener("click", ()=>{
    var sound = new Audio("./assets/water-droplet-2-165634.mp3")
    sound.load()
    sound.play() 
})