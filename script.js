// get relative position to each other
// point arrow or other illustration

function init() {
  let winPos = {
    x: undefined,
    y: undefined,
    id: Date.now()
  }
  const circle = document.querySelector(".circle")

  setInterval(() => {
    const allWin = JSON.parse(localStorage.getItem("windows")) || []
    const newWin = [...allWin]
    winPos = {
      ...winPos,
      x: window.screenLeft,
      y: window.screenTop,
    }

    if(newWin.find(el => el.id == winPos.id)) {
      const selectWin = newWin.find(el => el.id == winPos.id)
      selectWin.x = winPos.x
      selectWin.y = winPos.y
    } else {
      newWin.push(winPos)
    }

    localStorage.setItem("windows", JSON.stringify(newWin))
  }, 1000)
  
  addEventListener("beforeunload", () => {
    const allWin = JSON.parse(localStorage.getItem("windows")) || []
    const newWin = [...allWin]
    const filteredWin = newWin.filter(el => el.id !== winPos.id)

    localStorage.setItem("windows", JSON.stringify(filteredWin))
  })

  addEventListener("storage", () => {
    // update local storage from other window
  })
} 

init()