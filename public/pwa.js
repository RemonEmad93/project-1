if('serviceWorker'in navigator)
{
    navigator.serviceWorker.register("serviceWorker.js",{scope:"/"})
        .then((reg)=> console.log("serviceWorker registerd", reg))
        .catch((err)=> console.log("serviceWorker not registerd", err));
}