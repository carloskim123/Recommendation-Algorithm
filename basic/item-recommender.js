function Item(name, description) {
    this.name = name;
    this.description = description;
}

const items = [
    new Item("Chicken Noodle Soup", "Delicious soup for a comforting meal."),
    new Item("Organic Chicken Broth", "Homemade organic broth for soups and stews."),
    new Item("Grilled Chicken Salad", "Healthy salad with fresh greens and vinaigrette."),
    new Item("Wooden Salad Servers", "Handcrafted servers for stylish salads."),
    new Item("Lavender Scented Soy Candle", "Relaxing lavender-scented soy candle."),
    new Item("Exotic Fruit Basket", "Delightful assortment of exotic fruits."),
    new Item("Dark Chocolate Truffles", "Indulge in gourmet dark chocolate truffles."),
    new Item("Gourmet Meat Sampler", "Experience a variety of gourmet meats."),
];

// Function to calculate the similarity between two items based on their descriptions
function calculateSimilarity(item1, item2) {
    // This is a simple example using set intersection, but you could use more sophisticated techniques like cosine similarity
    return (item1.description.split(" ").filter(word => item2.description.includes(word)).length) / item1.description.split(" ").length;
}

// Function to generate recommendations for a given item
function generateRecommendations(item) {
    let recommendations = [];
    let exploreNew = [];

    // Loop through all items to find similar items
    for (let i = 0; i < items.length; i++) {
        let similarity = calculateSimilarity(item, items[i]);
        if (similarity > 0.45) {
            recommendations.push(items[i]);
        } else {
            exploreNew.push(items[i]);
        }
    }

    // Return an object containing both recommendations and exploreNew
    return { recommendations, exploreNew };
}

// Generate recommendations for the first item
const { recommendations, exploreNew } = generateRecommendations(items[0]);
console.log("Recommendations:", recommendations);
console.log("Explore New:", exploreNew);