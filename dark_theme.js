// Function to set the theme based on the cookie value
window.addEventListener("load",setThemeFromCookie)
function setThemeFromCookie() {
    const theme = getCookie("theme");
    const modeToggle = document.getElementById("darkmode");
  
    if (theme === "dark") {
      setDarkMode();
      modeToggle.setAttribute("checked","checked")
    } else {
      setLightMode();
    }
  }
  
  // Function to toggle the theme and update the cookie value
  function toggleTheme() {
    const modeToggle = document.getElementById("darkmode");
    
    if (modeToggle.checked) {
      setDarkMode();
      setCookie("theme", "dark", 30);
    } else {
      setLightMode();
      setCookie("theme", "light", 30);
    }
  }
  
  // Function to set the dark mode
  function setDarkMode() {
    document.getElementById("theme-style").setAttribute("href", "dark_theme.css");
  }
  
  // Function to set the light mode
  function setLightMode() {
    document.getElementById("theme-style").setAttribute("href", "app.css");
  }
  
  // Function to get the value of a cookie by name
  function getCookie(name) {
    const cookies = document.cookie.split(";");
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
  
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
  
    return "";
  }
  
  // Function to set a cookie with a given name, value, and expiration days
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  
  // Set the theme based on the cookie value when the page loads
  setThemeFromCookie();
  
  // Add event listener to the mode toggle
 console.log(document.querySelector("#darkmode"))
 document.querySelector("#darkmode").addEventListener("change", toggleTheme);
  