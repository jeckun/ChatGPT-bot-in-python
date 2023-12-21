var userLoggedIn = false;

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    const response = await fetch("/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById("message").innerText = `Login succeeded!`;

        document.getElementById('name').innerText = data.user.name;
        document.getElementById('email').innerText = data.user.email;
        document.getElementById('key').value = data.user.current_key;
        document.getElementById('proxy').value = data.user.proxy_url;
        document.getElementById('model').value = data.user.default_model;

        // 界面调整
        userLoggedIn = true;
        hideContent('sign-in-content');
        showContent('user-inf-content');
        
        // showContent('nav-out-tab');
        // hideContent('nav-sign-tab');
        
        // document.getElementById('nav-sign-tab').innerText = 'Sign Out';

    } else {
        const errorMessage = await response.text(); // 获取错误消息文本
        document.getElementById("message").json = `Login failed! ${errorMessage.message}`;
        userLoggedIn = false;
        showContent('sign-in-content');
        hideContent('sign-up-content');
        hideContent('user-inf-content');
    }
});


document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    var username = document.getElementById('registerUsername').value;
    var email = document.getElementById('registerEmail').value;
    var password = document.getElementById('registerPassword').value;

    const response = await fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}`
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById("message").innerText = `Register succeeded!`;

        document.getElementById('name').innerText = data.user.name;
        document.getElementById('email').innerText = data.user.email;
        document.getElementById('key').value = data.user.current_key;
        document.getElementById('proxy').value = data.user.proxy_url;
        document.getElementById('model').value = data.user.default_model;
        
        // 界面调整
        userLoggedIn = true;
        hideContent('sign-up-content');
        showContent('user-inf-content');
    } else {
        const errorMessage = await response.json(); // 获取错误消息文本
        document.getElementById("registerMessage").innerText = `Register failed! ${errorMessage.message}`;
        userLoggedIn = false;
        hideContent('sign-in-content');
        showContent('sign-up-content');
        hideContent('user-inf-content');
    }
});

function signUpShow() {
    // 点击按钮时切换到注册
    userLoggedIn = false;
    hideContent('sign-in-content');
    showContent('sign-up-content');
    hideContent('user-inf-content');
}

function signInShow() {
    // 点击按钮时切换到登录
    userLoggedIn = false;
    showContent('sign-in-content');
    hideContent('sign-up-content');
    hideContent('user-inf-content');
}

// 辅助函数用于显示内容
function showContent(contentId) {
    document.getElementById(contentId).classList.remove('hidden');
}

// 辅助函数用于隐藏内容
function hideContent(contentId) {
    document.getElementById(contentId).classList.add('hidden');
}