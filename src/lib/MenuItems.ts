interface MenuItem {
    category: string;
    name: string;
    description: string;
    serves: string;
}

interface Menu {
    category: string;
    items: MenuItem[];
}

export const menu: Menu[] = [
    {
        category: "Starters & Sides",
        items: [
            {
                category: "Starters & Sides",
                name: "Antipasto",
                description: "Vibrant Selection Of Italian Classics: Prosciutto, Salami, And Capicola, Paired With Marinated Olives, Roasted Peppers, and Fresh Mozzarella",
                serves: "Tray Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Mini Meatballs",
                description: "Vibrant Selection Of Italian Classics: Prosciutto, Salami, And Capicola, Paired With Marinated Olives, Roasted Peppers, and Fresh Mozzarella",
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
                description: "Savory Mushroom Caps Generously Filled With A Blend Of Garlic, Herbs, And Cream Cheese, Mixed With Seasoned Breadcrumbs And Topped With Melted Parmesan",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Grilled Asparagus",
                description: "Vibrant asparagus spears lightly tossed in olive oil and seasoned with sea salt and cracked black pepper, grilled to perfection for a smoky flavor",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Creamy Garlic Mashed Potatoes",
                description: "Smooth Mashed Potatoes Whipped With Roasted Garlic And Blended With Creamy Butter And Rich Heavy Cream",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Bruschetta",
                description: "Crispy Toasted Baguette Slices Topped with a Vibrant Mix Of Vine-Ripened Tomatoes, Fresh Basil, Garlic, and a Drizzle Of Extra Virgin Olive Oil",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "Garlicky Roasted Broccoli",
                description: "Tender broccoli florets roasted to perfection with a generous drizzle of olive oil, infused with roasted garlic and a hint of lemon zest",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "DICED FRUIT PLATTER",
                description: "A Delightful Medley Of Roasted Brussels Sprouts, Sweet Corn, And Tender English Peas, Sautéed With Shallots And Fresh Herbs. This Vibrant Dish Creates A Perfect Balance Of Earthy And Sweet Flavors",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "BRUSSEL SPROUT, CORN, AND ENGLISH PEA SUCCOTASH",
                description: "A delightful medley of roasted Brussels sprouts, sweet corn, and tender English peas, sautéed with shallots and fresh herbs. This vibrant dish creates a perfect balance of earthy and sweet flavors",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "GARLIC BREAD",
                description: "Warm, crusty bread baked to golden perfection, brushed with a generous blend of melted butter, roasted garlic, and fresh parsley. Lightly toasted for a satisfying crunch and finished with a sprinkle of parmesan cheese. Perfectly fragrant and delicious, served with homemade tomato sauce on the side",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Starters & Sides",
                name: "SHRIMP COCKTAIL",
                description: "Chilled Jumbo Shrimp, Perfectly Cooked And Served With A Zesty Homemade Cocktail Sauce, Bursting With The Tang Of Fresh Horseradish, Lemon, And A Touch Of Spice. Garnished With A Slice Of Lemon And Fresh Herbs.",
                serves: "Pan Serves 8-10"
            },
        ]
    },
    // Salads
    {
        category: "Salads",
        items: [
            {
                category: "Salads",
                name: "Greek Salad",
                description: "Salad greens and veggies, feta cheese crumbles and kalamata olives served with homemade balsamic vinaigrette",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
            {
                category: "Salads",
                name: "Caesar Salad",
                description: "Crispy romaine tossed with croutons and parmesan cheese served with caesar dressing",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
            {
                category: "Salads",
                name: "Italian Garden Salad",
                description: "Salad greens, tomatoes, cucumbers, and bell peppers served with homemade Italian vinaigrette",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
            {
                category: "Salads",
                name: "CAPRESE SALAD",
                description: "fresh basil, grape tomatoes, and mozzarella ovalini tossed together in a homemade balsamic dressing",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
            {
                category: "Salads",
                name: "PASTA SALAD",
                description: "tri-color rotini pasta, tomatoes, carrots, peppers, and feta cheese tossed in a homemade dressing",
                serves: "Small serves 8-10, Medium serves 13-15, Large serves 18-20"
            },
        ]
    },
    // Pasta For All
    {
        category: "Pasta For All",
        items: [
            {
                category: "Pasta For All",
                name: "Chicken Fettuccine Alfredo",
                description: "Juicy grilled chicken served over tender fettuccine, coated in a velvety Alfredo sauce made with cream, butter, and parmesan",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Pasta For All",
                name: "Spaghetti and Meatballs",
                description: "Classic spaghetti topped with tender, handcrafted beef meatballs, simmered in a rich, slow-cooked tomato marinara sauce",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Pasta For All",
                name: "Penne a la Vodka",
                description: "Al dente penne pasta tossed in a creamy vodka-infused tomato sauce with a touch of cream",
                serves: "Pan Serves 8-10"
            },
        ]
    },
    // Pasta Al Forno
    {
        category: "Pasta Al Forno",
        items: [
            {
                category: "Pasta Al Forno",
                name: "Beef Lasagna",
                description: "Layers of tender, hand-ground beef simmered in a rich marinara sauce, nestled between sheets of perfectly cooked pasta",
                serves: "Pan Serves 9"
            },
            {
                category: "Pasta Al Forno",
                name: "Baked Ziti Rigatoni",
                description: "Hearty rigatoni pasta baked in a rich tomato marinara sauce, layered with creamy ricotta, mozzarella, and parmesan",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Pasta Al Forno",
                name: "Vegetable Lasagna",
                description: "Layers of tender pasta interspersed with a medley of seasonal vegetables, including spinach, zucchini, bell peppers, and mushrooms",
                serves: "Pan Serves 9"
            },
        ]
    },
    // From Land To Sea
    {
        category: "From Land To Sea",
        items: [
            {
                category: "From Land To Sea",
                name: "Filet Mignon with Creamy Mushroom Marsala",
                description: "Tender, perfectly seared filet mignon topped with a luscious creamy mushroom Marsala sauce",
                serves: "Pan Serves 8-10"
            },
            {
                category: "From Land To Sea",
                name: "Lemon Butter Salmon",
                description: "Pan-seared salmon filet drizzled with a zesty lemon butter sauce. Served atop a bed of vibrant sautéed spinach",
                serves: "Pan Serves 8-10"
            },
        ]
    },
    // Entrees
    {
        category: "Entrees",
        items: [
            {
                category: "Entrees",
                name: "Chicken Parmigiana",
                description: "Juicy, tender chicken breast coated in a crispy Parmesan and herb crust, baked to golden perfection",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Entrees",
                name: "Eggplant Parmigiana",
                description: "Fresh sliced eggplant coated in a crispy Parmesan and herb crust, baked to golden perfection",
                serves: "Pan Serves 8-10"
            },
            {
                category: "Entrees",
                name: "Chicken Marsala",
                description: "Pan-seared chicken breasts simmered in a rich Marsala wine sauce, complemented by sautéed mushrooms and shallots",
                serves: "Pan Serves 8-10"
            },
        ]
    },
    // Sandwiches
    {
        category: "Sandwiches",
        items: [
            {
                category: "Sandwiches",
                name: "Classic Italian",
                description: "A delicious combination of savory genoa salami, capicola, and ham layered on a fresh hoagie roll",
                serves: "Minimum 4 per order"
            },
            {
                category: "Sandwiches",
                name: "3-Foot Italian Sub",
                description: "A giant, shareable delight featuring layers of savory genoa salami, capicola, and ham, piled high on a freshly baked hoagie roll",
                serves: "Serves 8-10"
            },
        ]
    },
    // Desserts
    {
        category: "Desserts",
        items: [
            {
                category: "Desserts",
                name: "Tiramisu",
                description: "A classic Italian dessert featuring layers of delicate ladyfingers soaked in rich espresso and coffee liqueur",
                serves: "Serves 9"
            },
            {
                category: "Desserts",
                name: "Cannolis",
                description: "Crispy, shell-shaped pastry shells filled with a luscious blend of sweetened ricotta cheese, flavored with delectable vanilla",
                serves: "Serves 8-10"
            },
            {
                category: "Desserts",
                name: "Lemon Pound Cake",
                description: "A moist and buttery pound cake, crafted from scratch using the finest ingredients and zesty lemon juice",
                serves: "Serves 10"
            },
        ]
    },
];