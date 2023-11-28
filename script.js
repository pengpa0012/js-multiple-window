// get relative position to each other
// point arrow or other illustration

function midpoint([x1, y1], [x2, y2]) { 
  return [x1 - x2, y1 - y2]
}

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
    const otherWin = newWin.find(el => el.id !== winPos.id)

    winPos = {
      ...winPos,
      x: window.screenLeft,
      y: window.screenTop,
    }

    // Adjust calculation
    if(newWin.length > 1) {
      const [x, y] = midpoint([winPos.x, winPos.y], [otherWin.x, otherWin.y])
      console.log(x, y, circle)
      circle.style.top = `${y}px`
      circle.style.left = `${x}px`
    }
   

    if(newWin.find(el => el.id == winPos.id)) {
      const selectWin = newWin.find(el => el.id == winPos.id)
      selectWin.x = winPos.x
      selectWin.y = winPos.y
    } else { 
      newWin.push(winPos)
    } 

    localStorage.setItem("windows", JSON.stringify(newWin))
  }, 500)
  
  addEventListener("beforeunload", () => {
    const allWin = JSON.parse(localStorage.getItem("windows")) || []
    const newWin = [...allWin]
    const filteredWin = newWin.filter(el => el.id !== winPos.id)

    localStorage.setItem("windows", JSON.stringify(filteredWin))
  })
} 

init()