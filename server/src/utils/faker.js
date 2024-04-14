const { faker } = require("@faker-js/faker");

/**
 * Generates a random username.
 * @returns {string} The random username.
 */
function createRandomUserName() {
    let username = faker.internet.userName();
    if (!/\d$/.test(username) && randomInt(0, 3) === 1) {
        username += randomInt(0, 100);
    }

    return sanitizeUsername(username);
}

/**
 * Generates a random avatar URL.
 * @returns {string} The random avatar URL.
 */
function createAvatarURL() {
    return faker.image.avatar();
}

/**
 * Generates a random bio phrase.
 * @returns {string} The random bio phrase.
 */
function createRandomBio() {
    const bioPhrases = [
        "Dreamer. Explorer. Lover of life.",
        "Passionate about technology and innovation.",
        "Always looking for the next adventure.",
        "Believer in kindness and positivity.",
        "Music enthusiast. Coffee lover. Netflix binger.",
        "Bookworm. Foodie. Travel addict.",
        "Aspiring artist. Daydreamer. Star gazer.",
        "Advocate for change and social justice.",
        "Eternal optimist. Seeker of happiness.",
        "Chasing dreams and making memories.",
        "Lover of mystery novels and late-night conversations.",
        "Inspired by nature and the beauty of the world.",
        "Seeking connections and meaningful conversations.",
        "Finding joy in the little things.",
        "Embracing imperfection and learning every day.",
        "Passionate about self-discovery and personal growth.",
        "Exploring new ideas and perspectives.",
        "Hoping to make a positive impact on the world.",
        "Living life one adventure at a time.",
        "Finding beauty in simplicity and authenticity.",
        "Free spirit. Adventure seeker. Nature lover.",
        "Coffee connoisseur. Dog enthusiast. Sunset chaser.",
        "Wanderer. Dreamer. Soul searcher.",
        "Creative mind with a passion for storytelling.",
        "Chronic daydreamer. Hopeless romantic.",
        "Ambitious dreamer with a heart full of wanderlust.",
        "Savoring life's moments, one cup of tea at a time.",
        "Curious soul with a thirst for knowledge.",
        "Quiet observer. Deep thinker. Optimistic realist.",
        "Simplicity advocate. Minimalist. Mindful living.",
        "Striving for balance in a chaotic world.",
        "Finding magic in the ordinary.",
        "Believer in serendipity and happy accidents.",
        "Captivated by the beauty of the universe.",
        "Rainy days, cozy blankets, and good books.",
        "Seeker of adventure and collector of memories.",
        "In love with the journey, not just the destination.",
        "Exploring the world with a camera in hand.",
        "Embracing change and the unknown with open arms.",
        "Sunshine mixed with a little hurricane.",
        "Passionate about building connections and community.",
        "Dancing through life with a song in my heart.",
        "Finding joy in the unexpected twists of fate.",
        "Wandering soul. Ever-changing, ever-growing.",
        "Walking a path paved with dreams and determination.",
        "Lost in thought, found in the moment.",
        "Planting seeds of kindness wherever I go.",
        "Writing my own story, one chapter at a time.",
        "Seeking the beauty in every moment.",
        "Chasing sunsets and starlight."
    ];
    return bioPhrases[randomInt(0, bioPhrases.length - 1)];
}

/**
 * Sanitizes a username by removing special characters and spaces.
 * @param {string} username - The username to sanitize.
 * @returns {string} The sanitized username.
 */
function sanitizeUsername(username) {
    return username.replace(/[^a-zA-Z0-9_.]/g, "").replace(/\s/g, "_").toLowerCase();
}

/**
 * Generates a random integer between the specified range.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} The random integer.
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { createRandomUserName, createAvatarURL, createRandomBio };
