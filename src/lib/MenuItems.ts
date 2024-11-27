interface MenuItem {
    category: string;
    name: string;
    description: string;
    serves: string;
}

interface Menu {
    category: string;
    id: string;
    items: MenuItem[];
}

export const menu: Menu[] = [
    {
        category: "Starters & Sides",
        id: "starters-sides",
        items: [
            {
                category: "Starters & Sides",
                name: "Antipasto",
                description: "Vibrant Selection Of Italian Classics: Prosciutto, Salami, And Capicola, Paired With Marinated Olives, Roasted Peppers, and Fresh Mozzarella. Served with Artisan Cheeses, Sun-Dried Tomatoes, And Crispy Crostinis",
                serves: "Tray Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Mini Meatballs",
                description: "Tender, Bite-Sized Beef Meatballs, Seasoned With Fresh Herbs And Garlic, Slow-Cooked In A Rich Tomato Basil Sauce",
                serves: "Tray Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Ravioli",
                description: "Your Choice Of Mushroom, Butternut Squash, 4 Cheese, Spinach, Crab, Or Lobster Ravioli Tossed In Your Choice Of Decadent Tomato Sauce, Creamy Alfredo Sauce, Or Fresh Made Pesto",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Stuffed Mushrooms",
                description: "Savory Mushroom Caps Generously Filled With A Blend Of Garlic, Herbs, And Cream Cheese, Mixed With Seasoned Breadcrumbs And Topped With Melted Parmesan. Baked To Golden Perfection, Offering A Delicious Burst Of Flavor In Every Bite",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Grilled Asparagus",
                description: "Vibrant asparagus spears lightly tossed in olive oil and seasoned with sea salt and cracked black pepper, grilled to perfection for a smoky flavor. Finished with a squeeze of lemon and a sprinkle of fresh parmesan, this dish offers a delightful crunch and a burst of freshness with every bite. A perfect accompaniment to any meal",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Creamy Garlic Mashed Potatoes",
                description: "Smooth Mashed Potatoes Whipped With Roasted Garlic And Blended With Creamy Butter And Rich Heavy Cream. Finished With A Sprinkle Of Fresh Chives And A Hint Of Sea Salt, This Classic Side Dish Is The Perfect Accompaniment To Any Entrée, Offering A Comforting And Flavorful Experience In Every Spoonful",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Bruschetta",
                description: "Crispy Toasted Baguette Slices Topped with a Vibrant Mix Of Vine-Ripened Tomatoes, Fresh Basil, Garlic, and a Drizzle Of Extra Virgin Olive Oil. Finished with a Touch of Balsamic Glaze for the Perfect Balance of Sweet and Savory",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Garlicky Roasted Broccoli",
                description: "Tender broccoli florets roasted to perfection with a generous drizzle of olive oil, infused with roasted garlic and a hint of lemon zest. Finished with a sprinkle of sea salt and cracked black pepper for a flavorful and healthy side dish",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Diced Fruit Platter",
                description: "A Vibrant Assortment Of Freshly Diced, Seasonal Fruits, Including Juicy Melons, Sweet Berries, And Succulent Pineapple. Artfully Arranged And Bursting With Natural Sweetness, This Colorful Platter Is The Perfect Light And Refreshing Treat For Any Occasion ",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Brussel Sprout, Corn, and English Pea Succotash",
                description: "A delightful medley of roasted Brussels sprouts, sweet corn, and tender English peas, sautéed with shallots and fresh herbs. This vibrant dish creates a perfect balance of earthy and sweet flavors",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Garlic Bread",
                description: "Warm, crusty bread baked to golden perfection, brushed with a generous blend of melted butter, roasted garlic, and fresh parsley. Lightly toasted for a satisfying crunch and finished with a sprinkle of parmesan cheese. Perfectly fragrant and delicious, served with homemade tomato sauce on the side",
                serves: "Pan Serves 8-10"
            },
        ]
    },
    // Salads
    {
        category: "Salads",
        id: "salads",
        items: [
            {
                category: "Salads",
                name: "Greek Salad",
                description: "Salad greens and veggies, feta cheese crumbles and kalamata olives served with homemade balsamic vinaigrette on the side",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
            {
                category: "Salads",
                name: "Caesar Salad",
                description: "Crispy romaine tossed with croutons and parmesan cheese served with caesar dressing on the side",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
            {
                category: "Salads",
                name: "Italian Garden Salad",
                description: "Salad greens, tomatoes, cucumbers, and bell peppers served with homemade Italian vinaigrette on the side",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
            {
                category: "Salads",
                name: "Caprese Salad",
                description: "Fresh basil, grape tomatoes, and mozzarella ovalini tossed together in a homemade balsamic dressing",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
            {
                category: "Salads",
                name: "Pasta Salad",
                description: "Tri-color rotini pasta, tomatoes, carrots, peppers, and feta cheese tossed in a homemade dressing",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
        ]
    },
    // Pasta For All
    {
        category: "Pasta For All",
        id: "pasta-for-all",
        items: [
            
            {
                category: "Pasta For All",
                name: "Spaghetti and Meatballs",
                description: "Classic spaghetti topped with tender, handcrafted beef meatballs, simmered in a rich, slow-cooked tomato marinara sauce. Finished with a sprinkle of parmesan and fresh basil for an authentic Italian experience. Comforting, flavorful, classic",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Pasta For All",
                name: "Penne a la Vodka",
                description: "Al dente penne pasta tossed in a creamy vodka-infused tomato sauce with a touch of cream..Finished with parmesan and fresh basil, this decadent dish offers a perfect balance of richness and tangy flavor.",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Pasta For All",
                name: "Chicken, Penne, Pesto",
                description: "Grilled chicken breast tossed with perfectly al dente penne pasta, coated in a fresh basil pesto sauce made with pine nuts, parmesan, and extra virgin olive oil. Refreshing and aromatic!",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Pasta For All",
                name: "CHICKEN FETTUCCINE ALFREDO",
                description: "Juicy Grilled Chicken Served Over Tender Fettuccine, Coated In A Velvety Alfredo Sauce Made With Cream, Butter, And Parmesan. Garnished With Fresh Parsley And A Hint Of Cracked Black Pepper, This Dish Offers A Perfect Balance Of Creamy Richness And Savory Flavors",
                serves: "Pan Serves 8-10"
            },
        ]
    },
    // Pasta Al Forno
    {
        category: "Pasta Al Forno",
        id: "pasta-al-forno",
        items: [
            {
                category: "Pasta Al Forno",
                name: "Beef Lasagna",
                description: "Layers of tender, hand-ground beef simmered in a rich marinara sauce, nestled between sheets of perfectly cooked pasta. Topped with a creamy blend of ricotta, mozzarella, and parmesan, then baked to golden perfection.",
                serves: "Pan Serves 9"
            },
            {
                category: "Pasta Al Forno",
                name: "Baked Ziti Rigatoni",
                description: "Hearty rigatoni pasta baked in a rich tomato marinara sauce, layered with creamy ricotta, mozzarella, and parmesan. Topped with a golden, bubbly cheese crust and infused with Italian herbs",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Pasta Al Forno",
                name: "Vegetable Lasagna",
                description: "Layers of tender pasta interspersed with a medley of seasonal vegetables, including spinach, zucchini, bell peppers, and mushrooms, all enveloped in a rich marinara sauce. Finished with a creamy ricotta and mozzarella cheese blend",
                serves: "Pan Serves 9"
            },
        ]
    },
    // From Land To Sea
    {
        category: "From Land To Sea",
        id: "from-land-to-sea",
        items: [
            {
                category: "From Land To Sea",
                name: "Filet Mignon with Creamy Mushroom Marsala",
                description: "Tender, perfectly seared filet mignon topped with a luscious creamy mushroom Marsala sauce. This rich sauce features sautéed mushrooms, shallots, and a splash of Marsala wine, creating a delightful balance of savory and earthy flavors",
                serves: "Pan Serves 8-10"
            },
            {
                category: "From Land To Sea",
                name: "Lemon Butter Salmon",
                description: "Pan-seared salmon filet drizzled with a zesty lemon butter sauce. Served atop a bed of vibrant sautéed spinach, lightly seasoned with garlic and a touch of olive oil",
                serves: "Pan Serves 8-10"
            },
            {
                category: "From Land To Sea",
                name: "Oven Roasted, Lemon Herbaceous Chicken Leg Quarters",
                description: "Juicy chicken leg quarters marinated in a fragrant blend of fresh herbs, zesty lemon juice, and garlic, then oven-roasted to golden perfection. Each piece boasts a crispy skin and tender, succulent meat infused with vibrant flavors -",
                serves: "Pan Serves 8-10"
            },
            {
                category: "From Land To Sea",
                name: "Jumbo Lump Crab Cakes",
                description: "Delicately Crafted With 100% Jumbo Lump Crab Meat And Absolutely No Filler, These Sumptuous Crab Cakes Are Seasoned To Perfection And Pan-Seared Until Golden Brown. Served With A Zesty Remoulade Sauce And Garnished With Fresh Herbs, Each Bite Bursts With The Sweet, Tender Flavors Of Premium Crab",
                serves: "Pan Serves 8-10"
            },
        ]
    },
    // Entrees
    {
        category: "Entrees",
        id: "entrees",
        items: [
            {
                category: "Entrees",
                name: "Chicken Parmigiana",
                description: "Juicy, tender chicken breast coated in a crispy Parmesan and herb crust, baked to golden perfection and topped with a rich marinara sauce. Finished with a generous layer of melted mozzarella cheese atop a bed of spaghetti and robust tomato sauce",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Entrees",
                name: "Eggplant Parmigiana",
                description: "Fresh sliced eggplant coated in a crispy Parmesan and herb crust, baked to golden perfection and topped with a rich marinara sauce. Finished with a generous layer of melted mozzarella cheese atop a bed of spaghetti and robust tomato sauce",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Entrees",
                name: "Chicken Marsala",
                description: "Pan-seared chicken breasts simmered in a rich Marsala wine sauce, complemented by sautéed mushrooms and shallots. The savory sauce is infused with a touch of garlic and fresh herbs, creating a delightful balance of flavors",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Entrees",
                name: "Chicken Francese",
                description: "Tender chicken breasts lightly coated in a Parmesan and herb crust, baked to a golden brown and finished in a luscious lemon-butter sauce garnished with fresh Italian parsley",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Entrees",
                name: "Shrimp Scampi",
                description: "Succulent shrimp sautéed to perfection in a rich garlic butter sauce, infused with a splash of white wine and a hint of lemon zest tossed with perfectly al dente linguini",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Entrees",
                name: "Sausage Sicillian",
                description: "Authentic Italian sausage, pan-seared to perfection, then simmered with bell peppers, onions, and a robust marinara sauce",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Entrees",
                name: "Chicken Piccata",
                description: "Pan-seared chicken breasts finished in a tangy lemon-caper sauce, creating a delightful balance of savory and zesty flavors. This classic Italian dish features a light and buttery sauce, enhanced with fresh parsley and a hint of white wine",
                serves: "Pan Serves 8-10"
            },
        ]
    },
    // Sandwiches
    {
        category: "Sandwiches",
        id: "sandwiches",
        items: [
            {
                category: "Sandwiches",
                name: "Classic Italian",
                description: "A delicious combination of savory genoa salami, capicola, and ham layered on a fresh hoagie roll. Topped with crisp lettuce, ripe tomatoes, red onions, and banana peppers, all drizzled with a zesty Italian dressing",
                serves: "Minimum 4 per order"
            },
            {
                category: "Sandwiches",
                name: "3-Foot Italian Sub",
                description: "A giant, shareable delight featuring layers of savory genoa salami, capicola, and ham, piled high on a freshly baked hoagie roll. Each foot is adorned with crisp lettuce, juicy tomatoes, red onions, and zesty pepperoncini, drizzled with a tangy Italian dressing. Finished with provolone cheese and a sprinkle of oregano, this colossal sub is perfect for parties, gatherings, or any occasion that calls for a delicious feast. Slice it up and let the flavors of Italy bring everyone together!",
                serves: "Serves 8-10"
            },
            {
                category: "Sandwiches",
                name: "Chicken Parm Sub",
                description: "Crispy breaded chicken cutlet, smothered in rich marinara sauce and topped with melted mozzarella cheese, all nestled in a soft, toasted sub roll",
                serves: "Minimum 4 per order"
            },
            {
                category: "Sandwiches",
                name: "Caprese",
                description: "Fresh basil, mozzarella, and tomato on a fresh baked sub roll topped with a homemade balsamic dressing",
                serves: "Serves 8-10"
            },
            {
                category: "Sandwiches",
                name: "Eggplant Parm Sub",
                description: "Layers of crispy, breaded eggplant slices, generously topped with marinara sauce and melted mozzarella cheese, all tucked inside a freshly toasted sub roll",
                serves: "Minimum 4 per order"
            },
        ]
    },
    // Desserts
    {
        category: "Desserts",
        id: "desserts",
        items: [
            
            {
                category: "Desserts",
                name: "Cannolis",
                description: "Crispy, shell-shaped pastry shells filled with a luscious blend of sweetened ricotta cheese, flavored with delectable vanilla. Each cannoli is finished with a sprinkle of mini chocolate chips and a dusting of powdered sugar, offering a delightful crunch and creamy sweetness in every bite",
                serves: "Serves 8-10"
            },
            {
                category: "Desserts",
                name: "Lemon Pound Cake",
                description: "A moist and buttery pound cake, crafted from scratch using the finest ingredients and zesty lemon juice for a bright, refreshing flavor. Each slice features a tender crumb and a hint of citrus, perfectly complemented by a light lemon glaze that adds a touch of sweetness",
                serves: "Serves 10"
            },
            {
                category: "Desserts",
                name: "Assorted Cookie And Chocolate Brownie Platter",
                description: "Fresh baked assorted chocolate chip, oatmeal raisin, and sugar cookies cut and half and placed on a platter top with fresh baked, quartered chocolate brownies",
                serves: "Serves 10"
            },
        ]
    },
];