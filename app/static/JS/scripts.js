// lemmatization demo
const btn = document.getElementById('analyze-button')
const grammarSection = document.getElementById('analyze-section')
const clearText = document.getElementById('analyze-text')
const grammarText = document.getElementById('prtext')
if (btn) {
  btn.addEventListener('click', () => {
    if (clearText.innerText === 'გაანალიზე') {
      if (grammarText.value.trim().length === 0) {
        alert('გთხოვთ, შეიყვანეთ ტექსტი.')
      } else if (grammarText.value.trim().length > maxCharacterCount) {
        alert(`გთხოვთ, გამოიყენეთ ${maxCharacterCount} სიმბოლოზე ნაკლები`)
      } else {
        displayLemmatizedData(grammarText.value.trim())

        grammarSection.classList.toggle('display-flex')
        clearText.innerText = 'გაასუფთავე'
        btn.style.background = '#707070'
      }
    } else {
      console.log('deleting divs')
      grammarSection.classList.toggle('display-flex')
      clearText.innerText = 'გაანალიზე'
      btn.style.background = '#496AC1'
      btn.classList.remove('clear-bt')
      grammarText.value = ''
      let allResultDivs = document.querySelectorAll('.grammar-block')
      let allResultTexts = document.querySelectorAll('.gram-textarea')
      console.log(allResultDivs)

      allResultDivs.forEach(elem => {
          console.log(elem)
          elem.remove()
      })
    }
  })
}


async function requestLemmatization(text) {
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "text": (text)
      })}
    return await fetch('api/lemma', options)
        .then(r => {return r.json() })
}

async function displayLemmatizedData(text) {
    let lemmatizedData = await requestLemmatization(text)

    const parentDiv = document.querySelectorAll('.grammar-blocks')[0]

    let counter = 0
    for (const word_obj of lemmatizedData) {
        console.log(word_obj)
        counter++
        let block_to_insert = document.createElement('div')
        block_to_insert.classList.add('grammar-block')
        block_to_insert.classList.add(`block-${counter-1}`)
        parentDiv.appendChild(block_to_insert)

        let child_block_to_insert = document.createElement('div')
        child_block_to_insert.classList.add('gram-textarea')
        block_to_insert.appendChild(child_block_to_insert)
        child_block_to_insert.innerHTML = `<p class="lemma-title"> ${escapeHtml(word_obj.raw)} </p> <br> 
                                                                    ლემმა: ${escapeHtml(word_obj.lemma)} <br> 
                                                                    თეგები: ${escapeHtml(word_obj.pos_tags)}`
    }
    console.log(lemmatizedData)
}


//team members
const members = document.querySelectorAll('.team-member');
const membersInfo = document.querySelectorAll('.team-info');
const flp = document.querySelectorAll('.full-photo');

if(members){
  membersInfo.forEach(memberInfo=>{
    members.forEach(member=>{
      member.addEventListener('click', ()=>{
        if(memberInfo.id === member.id){
          memberInfo.classList.add('active-info');
        }else{
          memberInfo.classList.remove('active-info');
        }
        members.forEach(e=>{
          if(member === e){
            e.classList.add('current-member')
          }else{
            e.classList.remove('current-member')
          }
        })
      })
    })
  })

  members.forEach((e)=>{
    flp.forEach((x)=>{
      document.querySelectorAll('.close-photo').forEach(y=>{
        y.addEventListener('click', ()=>{
          x.classList.remove('active-photo')
        })
      })
      e.addEventListener('dblclick', ()=>{
        if(e.id === x.id){
          x.classList.add('active-photo')
        }
      })
    })
  })
}


// utils
function escapeHtml(string)
{
    return string
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
