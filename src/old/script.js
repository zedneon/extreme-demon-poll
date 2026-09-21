
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xagppftwimzodqtmwjxi.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZ3BwZnR3aW16b2RxdG13anhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MzAwNzYsImV4cCI6MjA3NTEwNjA3Nn0.sblHbyH-BnRZ-Lzgv0z3WbiceYxhHcwjveNiEFX3nqA"
const supabase = createClient(supabaseUrl, supabaseKey)

let levels = [

]

async function get_levels() {
    let level_data = await supabase
        .rpc("fetch_random_demons")
    
    levels = level_data.data
    console.log(levels)
    update_displays()
}

function update_displays() {
    const boxl = document.getElementById("boxl")
    boxl.innerHTML = ""
    const boxr = document.getElementById("boxr")
    boxr.innerHTML = ""
    update_display(boxl, levels[0], 0)
    update_display(boxr, levels[1], 1)
}

function update_display(parent, level, idx) {
    let title = document.createElement("h2")
    title.innerText = level.name;

    let author = document.createElement("h3")
    author.innerText = `By ${level.creator}`

    let verifier = document.createElement("h3")
    verifier.innerText = `Verifier: ${level.verifier}`

    let yt = document.createElement("iframe")
    yt.src = `https://www.youtube.com/embed/${level.youtube}`
    yt.allow = "clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    yt.referrerPolicy = "strict-origin-when-cross-origin"
    yt.allowFullscreen = true

    let id = document.createElement("p")
    id.innerHTML = `id: <a href="https://gdbrowser.com/${level.level_id}" target="_blank">${level.level_id}</a>`

    /*
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
referrerpolicy="strict-origin-when-cross-origin" 
    */

    let button = document.createElement("button")
    button.classList.add("votebutton")
    button.onclick = () => {
        button.classList.add("voted")
        for (var voter of document.getElementsByClassName("votebutton")) {
            voter.disabled = true
        }
        vote(level.level_id, levels[1-idx].level_id)
    }

    button.innerText = "Vote!"

    parent.appendChild(title)
    parent.appendChild(author)
    parent.appendChild(verifier)
    parent.appendChild(yt)
    parent.appendChild(id)
    parent.appendChild(button)
}

document.body.onload = () => {
    document.getElementById("reroll").onclick = get_levels
    get_levels()
}

async function vote(id, anti_id) {
    console.log("voting for " + id)
    console.log("killing " + anti_id)

    // vote
    const {error1} = await supabase
        .rpc("increment_demon_votes", {p_level_id: id});

    // kill
    const {error2} = await supabase
        .rpc("increment_demon_anti_votes", {p_level_id: anti_id});

    if (error1) {console.error(error1)}
    if (error2) {console.error(error2)}

    // alert("thanks for voting!\nnew levels now loading");
    setTimeout(() => {
        get_levels()
    }, 500);
}

// function vote() {
//     // Example: level_id is a UUID string

// const
//  levelId = 
// 'your-level-id-uuid'
// ;
// const
//  { data, error } = 
// await
//  supabase
//   .rpc(
// 'increment_demon_votes'
// , { 
// p_level_id
// : levelId });
// if
//  (error) {
  
// console
// .error(
// 'RPC error:'
// , error);
// } 
// else
//  {
  
// // data is the returned integer (new votes)

  
// console
// .log(
// 'New votes:'
// , data);
// }
// }