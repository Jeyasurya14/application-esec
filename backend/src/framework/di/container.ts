type Factory<T> = () => T;

export class Container {
  private static _instance: Container | null = null;

  private readonly factories = new Map<string, Factory<unknown>>();
  private readonly singletons = new Map<string, unknown>();

  static getInstance(): Container {
    if (!Container._instance) {
      Container._instance = new Container();
    }
    return Container._instance;
  }

  static setInstance(container: Container): void {
    Container._instance = container;
  }

  register<T>(token: string, factory: Factory<T>): void {
    this.factories.set(token, factory);
  }

  registerSingleton<T>(token: string, factory: Factory<T>): void {
    this.factories.set(token, () => {
      if (!this.singletons.has(token)) {
        this.singletons.set(token, factory());
      }
      return this.singletons.get(token) as T;
    });
  }

  resolve<T>(token: string): T {
    const factory = this.factories.get(token);
    if (!factory) {
      throw new Error(`Dependency not registered: ${token}`);
    }
    return factory() as T;
  }

  has(token: string): boolean {
    return this.factories.has(token);
  }
}
