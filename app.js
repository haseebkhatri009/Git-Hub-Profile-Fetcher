// document.getElementById('form').addEventListener('submit', function(e) {
//     e.preventDefault(); // Prevent form submission
    
//     const username = document.getElementById('username').value;
//     const errorDiv = document.getElementById('message');
//     const profileDiv = document.getElementById('profile');

//     // Clear previous results
//     errorDiv.textContent = '';
//     profileDiv.style.display = 'none';

//     // Fetch GitHub profile using GitHub API
//     fetch(`https://api.github.com/users/${username}`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('GitHub user not found ');
//             }
//         })
//         .then(data => {
//             // Display the profile data
//             console.log(data);
            
//             document.getElementById('avatar').src = data.avatar_url;
//             document.getElementById('name').textContent = data.name || 'No name provided';
//             document.getElementById('bio').textContent = data.bio || 'No bio available';
//             document.getElementById('follower').textContent = "Followers:" + data.followers || 'No bio available';
//             document.getElementById('following').textContent = "Followings: " + data.following || 'No bio available';
//             document.getElementById('profile-link').href = data.html_url;
//             profileDiv.style.display = 'block';
//         })
//         .catch(error => {
//             // Display error message if user is not found
//             errorDiv.textContent = error.message;
//         });
// });

const form = document.querySelector("#form");
const mainDiv = document.querySelector("#main-div");
const messageDiv = document.querySelector("#message");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const imgTag = mainDiv.children[0];  
    const name = mainDiv.children[1];
    const repos = mainDiv.children[2];
    const followers = mainDiv.children[3];
    const following = mainDiv.children[4];
    const link = mainDiv.children[5];
    
    const value = event.target.children[0].value;
    messageDiv.innerText = "";
    const API = `https://api.github.com/users/${value}`;

    try {
        const response = await axios(API);
    
    imgTag.src = response.data.avatar_url;
    name.innerText = response.data.name;
    repos.innerHTML = '<strong>Public Repositories: </strong> ' + response.data.public_repos;
    link.innerText = "click here for more information"
    link.href = response.data.html_url;
    followers.innerHTML = '<strong>Followers:</strong> ' + response.data.followers;
    following.innerHTML = '<strong>Followings:</strong>' + response.data.following;

    mainDiv.style.border = "2px solid black";
    mainDiv.style.backgroundColor = " rgb(194, 180, 180)";
    } catch (err) {
    console.log(err.response.data.message);

    messageDiv.innerText = "Git-Hub credential Not-Found";

    imgTag.src = "";
    name.innerText = "";
    repos.innerText = "";
    link.href = "";
    link.innerText = "";
    followers.innerText = "";
    following.innerText = "";
    mainDiv.style.border = "";
    mainDiv.style.backgroundColor = ""; 
    }
}
);