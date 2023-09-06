export declare interface IRouteModel{
    /**
     * Route Unique Identifier
     * @type {Number}
     */
    id: number;

    /**
     * Display Name of route
     * @type {string}
     */
    routeName: string;

    /**
     * Routing path
     * @type {string}
     */
    routeValue: string;

    /**
     * Description on the route path or page that the route redirects to
     * @type {string}
     */
    description: string;

    /**
     * Unique Identifier of the application that the route belongs to
     * @type {string}
     */
    applicationId: number;

    /**
     * Name of the application that this route belongs to
     * @type {string}
     */
    applicationName: string;

    /**
     * Parent route Id
     * @type {number | null}
     */
    parentRouteId: number | null;
}
