abstract class Config {
    public moviesFile: string = "./src/00-DB/movies.json";
    public usersFile: string = "./src/00-DB/users.json";
    public loginExpiresIn: string;
}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.loginExpiresIn = "3h";
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.loginExpiresIn = "30m";
    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
