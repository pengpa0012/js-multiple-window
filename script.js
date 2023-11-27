// save window position to localstorage
// add storage listener to know other window position
// get relative position to each other
// point arrow or other illustration
// clear localstorage on window close

function init() {
  let winPos = {
    x: undefined,
    y: undefined,
    id: Date.now()
  }
  const allWin = JSON.parse(localStorage.getItem("windows")) || []

  setInterval(() => {
    winPos = {
      ...winPos,
      x: window.screenLeft,
      y: window.screenTop,
    }

    const newWin = [...allWin]

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
    allWin.splice(winPos.id, 1)
    localStorage.setItem("windows", JSON.stringify(allWin))
  })

  addEventListener("storage", () => {
    // update local storage from other window
  })
} 

init()