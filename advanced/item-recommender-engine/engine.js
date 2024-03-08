import fetch from 'node-fetch';

// Fetch sample user-item data from JSONPlaceholder
async function fetchUserItemData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    // Simplify data for demonstration (user: userId, item: postId, rating: random)
    const userItemMatrix = {};

    posts.forEach(post => {
        const userId = post.userId.toString();
        const itemId = post.id.toString();
        const rating = Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5

        if (!userItemMatrix[userId]) {
            userItemMatrix[userId] = {};
        }

        userItemMatrix[userId][itemId] = rating;
    });

    return userItemMatrix;
}

// Function to get recommendations for a user
function getRecommendations(user, userItemMatrix) {
    const userRatings = userItemMatrix[user];

    const allItems = new Set();
    for (const otherUser in userItemMatrix) {
        if (otherUser !== user) {
            for (const item in userItemMatrix[otherUser]) {
                allItems.add(item);
            }
        }
    }

    const recommendations = [];
    for (const item of allItems) {
        if (!userRatings || !userRatings[item]) {
            let sum = 0;
            let count = 0;

            for (const otherUser in userItemMatrix) {
                if (otherUser !== user && userItemMatrix[otherUser][item]) {
                    sum += userItemMatrix[otherUser][item];
                    count++;
                }
            }

            if (count > 0) {
                const averageRating = sum / count;
                recommendations.push({ item, rating: averageRating });
            }
        }
    }

    recommendations.sort((a, b) => b.rating - a.rating); // Sort in descending order of ratings
    return recommendations;
}

// Example usage
async function run() {
    const userItemMatrix = await fetchUserItemData();
    const users = Object.keys(userItemMatrix);
    const randomUser = users[Math.floor(Math.random() * users.length)];


    const recommendations = getRecommendations(randomUser, userItemMatrix);
    console.log(`\nRecommendations for User ${randomUser}:`);
    console.log(recommendations);
}

run();
