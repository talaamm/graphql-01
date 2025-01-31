let checkpoint1
let piscinego1
let java1
let pro1
let bon
const token = localStorage.getItem('jwtToken')
const techSkills = {
    'GO': 0,
    'JS': 0,
    'HTML': 0,
    'SQL': 0,
    'Unix': 0,
    'CSS': 0,
    'Docker': 0,
    'RUST': 0,
    'Java': 0,
    'Non-relational Databases': 0,
    'C': 0,
    'Shell': 0,
    'PHP': 0,
    'Python': 0,
    'Ruby': 0,
    'C++': 0,
    'GraphQL': 0,
    'Ruby on Rails': 0,
    'Laravel': 0,
    'Django': 0,
    'Electron': 0,
    'Git': 0,
}

document.getElementById("logout").addEventListener('click', () => {
    localStorage.removeItem('jwtToken')
    console.log("jwt: " , localStorage.getItem('jwtToken'))
    window.location.href = ("index.html")
})

document.addEventListener("DOMContentLoaded", async function() {
    await fetchdata()
})

async function fetchdata() {
    try {
        let resp = await fetch('https://adam-jerusalem.nd.edu/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                // It is used to pass tokens securely to the server 
                /*Bearer authentication. 
                It will only allow access to the data belonging 
                to the authenticated user. 
                A Bearer Token is a type of access token*/
            },
            body: JSON.stringify({
                query: `{
                        user {
                          id
                          login
                          firstName
                          lastName
                          xps {
                            amount
                            path
                          }
                        }
                        }`,
            }),
        })
        let obj = await resp.json()
        //   console.log(obj)
        // console.log( obj.data.user[0].id)
        document.getElementById('userId').textContent = obj.data.user[0].id
        document.getElementById('userLogin').textContent = obj.data.user[0].login
        document.getElementById('fullname').textContent = obj.data.user[0].firstName + ' ' + obj.data.user[0].lastName;

        //calculate xp for checkpoints
        let totalXP = CalculateXP_for(obj.data.user[0].xps, "/adam/module/checkpoint/")
        document.getElementById('userXP').textContent = totalXP

        let pgo = CalculateXP_for(obj.data.user[0].xps, "/adam/piscine-go/")
        document.getElementById('p-go').textContent = pgo

        let pjs = CalculateXP_for(obj.data.user[0].xps, "/adam/module/piscine-js/")
        document.getElementById('p-js').textContent = pjs

        let projects = CalculateXP_reg(obj.data.user[0].xps, /^\/adam\/module\/[\w-]+$/)
        document.getElementById('prj-xp').textContent = projects

        let bonus = CalculateXP_reg(obj.data.user[0].xps, /^\/adam\/module$/) //// path: /adam/module
        document.getElementById('bonus').textContent = bonus

        document.getElementById('intra-xp').textContent = projects + totalXP + bonus

        checkpoint1 = totalXP
        piscinego1 = pgo
        java1 = pjs
        pro1 = projects
        bon = bonus
        XPchart()
        await fetchadoit()
        let skills = await fetchmore()
        piewiwi(skills)
        let data = await XpPerProject()
        projectsChart(data)
    } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to load profile data. Please log in again.', error);
        window.location.href = "index.html";
    }
};

function CalculateXP_for(arr, For) {
    let sum = 0
    arr.forEach(element => {
        if (element.path.includes(For)) { //string.includes(substring, startPosition)
            sum += Number(element.amount)
        }
    });
    return sum
}

function CalculateXP_reg(arr, reg) {
    let sum = 0
    arr.forEach(element => {
        if (reg.test(element.path)) {
            sum += Number(element.amount)
        }
    });
    return sum
}

async function fetchadoit() {
    let soso = await fetch('https://adam-jerusalem.nd.edu/api/graphql-engine/v1/graphql', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `{
        user{
       auditRatio
       
       audits_aggregate{
       nodes{
         
         resultId
         auditedAt
       }
       }
       } 
       }`,
        }),
    })
    let sum = 0
    let savelolo = await soso.json()
    let pathlolo = savelolo.data.user[0].audits_aggregate.nodes
    pathlolo.forEach(ebcd => {
        if (ebcd.auditedAt != null) {
            sum++
        }
    });
    console.log(savelolo)
    console.log(pathlolo)
    console.log(sum)
    let round = savelolo.data.user[0].auditRatio
    document.getElementById('auditscomplete').textContent = sum
    document.getElementById('auditsRatio').textContent = Math.round(round * 10) / 10;
}

function getMaxAmount(arr, type) {
    let maxnum = 0;
    arr.forEach(el => {
        if (el.type == (type)) {
            maxnum = Math.max(maxnum, el.amount)
        }
    })
    return maxnum
}

async function fetchmore() {
    let resp = await fetch('https://adam-jerusalem.nd.edu/api/graphql-engine/v1/graphql', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `{
                       transaction {
                            type 
                            amount
                        }
                    }`,
        }),
    })
    let respj = await resp.json()
    let arr = respj.data.transaction
    console.log(respj)
    console.log(arr)
    let currLevel = getMaxAmount(arr, "level")
    console.log(currLevel)
    document.getElementById('currLevel').textContent = currLevel
    ///////////////a apie chart for technical skils
    const myDiv = document.getElementById("techSkills");
    const gainedSkills = {}
    for (const key in techSkills) {
        // console.log(`Key: ${key}, Value: ${techSkills[key]}`);
        techSkills[key] = getMaxAmount(arr, "skill_" + key.toLowerCase()) || 0
        if (techSkills[key] != 0) {
            const newHeading = document.createElement("h4");
            newHeading.textContent = key + ": " + techSkills[key] + "%";
            // Append it to the div
            myDiv.appendChild(newHeading);
            gainedSkills[key] = techSkills[key]
        }
    }
    console.log(techSkills)
    let chLev = getMaxAmount(arr, 'skill_prog')
    document.getElementById('highestLev').textContent = chLev + "%"
    return gainedSkills
}

async function XpPerProject() {

    let resp = await fetch('https://adam-jerusalem.nd.edu/api/graphql-engine/v1/graphql', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `query ($regexPattern: String!) {
                      xp_view(where: {path: {_regex: $regexPattern}}) {
                        amount
                        path
                      }
                    }`,
            variables: {
                regexPattern: "^\\/adam\\/module\\/[\\w-]+$"
            },
        }),
    })

    let bb = await resp.json()
    console.log(bb)
    let final = bb.data.xp_view.filter(el => !el.path.includes('piscine'))
    console.log(final.length)
    document.getElementById('totalP').textContent = final.length + " Projects🚀"
    return final
}