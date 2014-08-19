(function(window, angular, undefined) {'use strict';

var urlBase = "/api";

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "User",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/users/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.User#login
         * @methodOf lbServices.User
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          url: urlBase + "/users/login",
          method: "POST",
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          }
        },

        /**
         * @ngdoc method
         * @name lbServices.User#logout
         * @methodOf lbServices.User
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          url: urlBase + "/users/logout",
          method: "POST",
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.save();
              return response.resource;
            }
          }
        },

        /**
         * @ngdoc method
         * @name lbServices.User#confirm
         * @methodOf lbServices.User
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/users/confirm",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#resetPassword
         * @methodOf lbServices.User
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/users/reset",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#create
         * @methodOf lbServices.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/users",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#upsert
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/users",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#exists
         * @methodOf lbServices.User
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/users/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/users/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#find
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/users",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findOne
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/users/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#deleteById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/users/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#count
         * @methodOf lbServices.User
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/users/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#updateAll
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/users/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$updateAttributes
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - user id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/users/:id",
          method: "PUT",
        },

        // INTERNAL. Use User.accessTokens.findById() instead.
        "prototype$__findById__accessTokens": {
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "GET",
        },

        // INTERNAL. Use User.accessTokens.destroyById() instead.
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use User.accessTokens.updateById() instead.
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "PUT",
        },

        // INTERNAL. Use User.accessTokens() instead.
        "prototype$__get__accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use User.accessTokens.create() instead.
        "prototype$__create__accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "POST",
        },

        // INTERNAL. Use User.accessTokens.destroyAll() instead.
        "prototype$__delete__accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "DELETE",
        },

        // INTERNAL. Use AccessToken.user() instead.
        "::get::accessToken::user": {
          url: urlBase + "/accessTokens/:id/user",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {Function(Object, Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/" + "/users" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.User#updateOrCreate
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.User#destroyById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#removeById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#update
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @return {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @return {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @return {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
     * @ngdoc object
     * @name lbServices.User.accessTokens
     * @object
     * @description
     *
     * The object `User.accessTokens` groups methods
     * manipulating `AccessToken` instances related to `User`.
     *
     * Use {@link lbServices.User#accessTokens} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.User#accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Queries accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - user id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::get::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#create
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - user id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens.create = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::create::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#destroyAll
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - user id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens.destroyAll = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::delete::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#destroyById
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Delete a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - user id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.accessTokens.destroyById = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::destroyById::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#findById
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Find a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - user id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens.findById = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::findById::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#updateById
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Update a related item by id for accessTokens
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - user id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens.updateById = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::updateById::user::accessTokens"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.AccessToken
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `AccessToken` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "AccessToken",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/accessTokens/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#create
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/accessTokens",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#upsert
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/accessTokens",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#exists
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/accessTokens/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#findById
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/accessTokens/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#find
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/accessTokens",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#findOne
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/accessTokens/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#deleteById
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/accessTokens/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#count
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/accessTokens/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#updateAll
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/accessTokens/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#prototype$updateAttributes
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - accessToken id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/accessTokens/:id",
          method: "PUT",
        },

        // INTERNAL. Use AccessToken.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/accessTokens/:id/user",
          method: "GET",
        },

        // INTERNAL. Use User.accessTokens.findById() instead.
        "::findById::user::accessTokens": {
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "GET",
        },

        // INTERNAL. Use User.accessTokens.destroyById() instead.
        "::destroyById::user::accessTokens": {
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use User.accessTokens.updateById() instead.
        "::updateById::user::accessTokens": {
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "PUT",
        },

        // INTERNAL. Use User.accessTokens() instead.
        "::get::user::accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use User.accessTokens.create() instead.
        "::create::user::accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "POST",
        },

        // INTERNAL. Use User.accessTokens.destroyAll() instead.
        "::delete::user::accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "DELETE",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.AccessToken#updateOrCreate
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#destroyById
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#removeById
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#update
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



        /**
         * @ngdoc method
         * @name lbServices.AccessToken#user
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Fetches belongsTo relation user
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - accessToken id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::accessToken::user"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Cartridge
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Cartridge` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Cartridge",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/cartridges/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#create
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/cartridges",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#upsert
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/cartridges",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#exists
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/cartridges/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#findById
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/cartridges/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#find
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/cartridges",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#findOne
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/cartridges/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#deleteById
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/cartridges/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#count
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/cartridges/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#updateAll
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/cartridges/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#prototype$updateAttributes
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridge id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/cartridges/:id",
          method: "PUT",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.findById() instead.
        "prototype$__findById__cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned/:fk",
          method: "GET",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.destroyById() instead.
        "prototype$__destroyById__cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.updateById() instead.
        "prototype$__updateById__cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned() instead.
        "prototype$__get__cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.create() instead.
        "prototype$__create__cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned",
          method: "POST",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.destroyAll() instead.
        "prototype$__delete__cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned",
          method: "DELETE",
        },

        // INTERNAL. Use Cartridge.customer() instead.
        "prototype$__get__customer": {
          url: urlBase + "/cartridges/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use CartridgeCredit.cartridge() instead.
        "::get::cartridgeCredit::cartridge": {
          url: urlBase + "/cartridgeCredits/:id/cartridge",
          method: "GET",
        },

        // INTERNAL. Use CartridgeReturn.cartridge() instead.
        "::get::cartridgeReturn::cartridge": {
          url: urlBase + "/cartridgeReturns/:id/cartridge",
          method: "GET",
        },

        // INTERNAL. Use Customer.cartridge.findById() instead.
        "::findById::customer::cartridge": {
          url: urlBase + "/customers/:id/cartridge/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.cartridge.destroyById() instead.
        "::destroyById::customer::cartridge": {
          url: urlBase + "/customers/:id/cartridge/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.cartridge.updateById() instead.
        "::updateById::customer::cartridge": {
          url: urlBase + "/customers/:id/cartridge/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.cartridge() instead.
        "::get::customer::cartridge": {
          url: urlBase + "/customers/:id/cartridge",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.cartridge.create() instead.
        "::create::customer::cartridge": {
          url: urlBase + "/customers/:id/cartridge",
          method: "POST",
        },

        // INTERNAL. Use Customer.cartridge.destroyAll() instead.
        "::delete::customer::cartridge": {
          url: urlBase + "/customers/:id/cartridge",
          method: "DELETE",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Cartridge#updateOrCreate
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#destroyById
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#removeById
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#update
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];


    /**
     * @ngdoc object
     * @name lbServices.Cartridge.cartridgesReturned
     * @object
     * @description
     *
     * The object `Cartridge.cartridgesReturned` groups methods
     * manipulating `CartridgeReturn` instances related to `Cartridge`.
     *
     * Use {@link lbServices.Cartridge#cartridgesReturned} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Cartridge#cartridgesReturned
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Queries cartridgesReturned of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridge id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::get::cartridge::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Cartridge.cartridgesReturned#create
         * @methodOf lbServices.Cartridge.cartridgesReturned
         *
         * @description
         *
         * Creates a new instance in cartridgesReturned of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridge id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned.create = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::create::cartridge::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Cartridge.cartridgesReturned#destroyAll
         * @methodOf lbServices.Cartridge.cartridgesReturned
         *
         * @description
         *
         * Deletes all cartridgesReturned of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridge id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned.destroyAll = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::delete::cartridge::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Cartridge.cartridgesReturned#destroyById
         * @methodOf lbServices.Cartridge.cartridgesReturned
         *
         * @description
         *
         * Delete a related item by id for cartridgesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridge id
         *
         *  - `fk` – `{*}` - Foreign key for cartridgesReturned
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.cartridgesReturned.destroyById = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::destroyById::cartridge::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Cartridge.cartridgesReturned#findById
         * @methodOf lbServices.Cartridge.cartridgesReturned
         *
         * @description
         *
         * Find a related item by id for cartridgesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridge id
         *
         *  - `fk` – `{*}` - Foreign key for cartridgesReturned
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned.findById = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::findById::cartridge::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Cartridge.cartridgesReturned#updateById
         * @methodOf lbServices.Cartridge.cartridgesReturned
         *
         * @description
         *
         * Update a related item by id for cartridgesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridge id
         *
         *  - `fk` – `{*}` - Foreign key for cartridgesReturned
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned.updateById = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::updateById::cartridge::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Cartridge#customer
         * @methodOf lbServices.Cartridge
         *
         * @description
         *
         * Fetches belongsTo relation customer
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridge id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customer = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::cartridge::customer"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.CartridgeCredit
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `CartridgeCredit` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "CartridgeCredit",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/cartridgeCredits/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#create
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeCredit` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/cartridgeCredits",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#upsert
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeCredit` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/cartridgeCredits",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#exists
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/cartridgeCredits/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#findById
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeCredit` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/cartridgeCredits/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#find
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeCredit` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/cartridgeCredits",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#findOne
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeCredit` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/cartridgeCredits/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#deleteById
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/cartridgeCredits/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#count
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/cartridgeCredits/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#updateAll
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/cartridgeCredits/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#prototype$updateAttributes
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridgeCredit id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeCredit` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/cartridgeCredits/:id",
          method: "PUT",
        },

        // INTERNAL. Use CartridgeCredit.cartridge() instead.
        "prototype$__get__cartridge": {
          url: urlBase + "/cartridgeCredits/:id/cartridge",
          method: "GET",
        },

        // INTERNAL. Use CartridgeCredit.customer() instead.
        "prototype$__get__customer": {
          url: urlBase + "/cartridgeCredits/:id/customer",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#updateOrCreate
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeCredit` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#destroyById
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#removeById
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#update
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#cartridge
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Fetches belongsTo relation cartridge
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridgeCredit id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        R.cartridge = function() {
          var TargetResource = $injector.get("Cartridge");
          var action = TargetResource["::get::cartridgeCredit::cartridge"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CartridgeCredit#customer
         * @methodOf lbServices.CartridgeCredit
         *
         * @description
         *
         * Fetches belongsTo relation customer
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridgeCredit id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customer = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::cartridgeCredit::customer"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.CartridgeReturn
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `CartridgeReturn` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "CartridgeReturn",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/cartridgeReturns/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#create
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/cartridgeReturns",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#upsert
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/cartridgeReturns",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#exists
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/cartridgeReturns/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#findById
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/cartridgeReturns/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#find
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/cartridgeReturns",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#findOne
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/cartridgeReturns/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#deleteById
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/cartridgeReturns/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#count
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/cartridgeReturns/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#updateAll
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/cartridgeReturns/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#prototype$updateAttributes
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridgeReturn id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/cartridgeReturns/:id",
          method: "PUT",
        },

        // INTERNAL. Use CartridgeReturn.cartridge() instead.
        "prototype$__get__cartridge": {
          url: urlBase + "/cartridgeReturns/:id/cartridge",
          method: "GET",
        },

        // INTERNAL. Use CartridgeReturn.customer() instead.
        "prototype$__get__customer": {
          url: urlBase + "/cartridgeReturns/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.findById() instead.
        "::findById::cartridge::cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned/:fk",
          method: "GET",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.destroyById() instead.
        "::destroyById::cartridge::cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.updateById() instead.
        "::updateById::cartridge::cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned() instead.
        "::get::cartridge::cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.create() instead.
        "::create::cartridge::cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned",
          method: "POST",
        },

        // INTERNAL. Use Cartridge.cartridgesReturned.destroyAll() instead.
        "::delete::cartridge::cartridgesReturned": {
          url: urlBase + "/cartridges/:id/cartridgesReturned",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.cartridgesReturned.findById() instead.
        "::findById::customer::cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.cartridgesReturned.destroyById() instead.
        "::destroyById::customer::cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.cartridgesReturned.updateById() instead.
        "::updateById::customer::cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.cartridgesReturned() instead.
        "::get::customer::cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.cartridgesReturned.create() instead.
        "::create::customer::cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned",
          method: "POST",
        },

        // INTERNAL. Use Customer.cartridgesReturned.destroyAll() instead.
        "::delete::customer::cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned",
          method: "DELETE",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#updateOrCreate
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#destroyById
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#removeById
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#update
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#cartridge
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Fetches belongsTo relation cartridge
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridgeReturn id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        R.cartridge = function() {
          var TargetResource = $injector.get("Cartridge");
          var action = TargetResource["::get::cartridgeReturn::cartridge"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CartridgeReturn#customer
         * @methodOf lbServices.CartridgeReturn
         *
         * @description
         *
         * Fetches belongsTo relation customer
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - cartridgeReturn id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customer = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::cartridgeReturn::customer"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Customer
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Customer` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Customer",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/customers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Customer#create
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/customers",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Customer#upsert
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/customers",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Customer#exists
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/customers/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Customer#findById
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/customers/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Customer#find
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/customers",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Customer#findOne
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/customers/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Customer#deleteById
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/customers/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Customer#count
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/customers/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Customer#updateAll
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/customers/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Customer#prototype$updateAttributes
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/customers/:id",
          method: "PUT",
        },

        // INTERNAL. Use Customer.cartridge.findById() instead.
        "prototype$__findById__cartridge": {
          url: urlBase + "/customers/:id/cartridge/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.cartridge.destroyById() instead.
        "prototype$__destroyById__cartridge": {
          url: urlBase + "/customers/:id/cartridge/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.cartridge.updateById() instead.
        "prototype$__updateById__cartridge": {
          url: urlBase + "/customers/:id/cartridge/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.cartridge() instead.
        "prototype$__get__cartridge": {
          url: urlBase + "/customers/:id/cartridge",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.cartridge.create() instead.
        "prototype$__create__cartridge": {
          url: urlBase + "/customers/:id/cartridge",
          method: "POST",
        },

        // INTERNAL. Use Customer.cartridge.destroyAll() instead.
        "prototype$__delete__cartridge": {
          url: urlBase + "/customers/:id/cartridge",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.cartridgesReturned.findById() instead.
        "prototype$__findById__cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.cartridgesReturned.destroyById() instead.
        "prototype$__destroyById__cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.cartridgesReturned.updateById() instead.
        "prototype$__updateById__cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.cartridgesReturned() instead.
        "prototype$__get__cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.cartridgesReturned.create() instead.
        "prototype$__create__cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned",
          method: "POST",
        },

        // INTERNAL. Use Customer.cartridgesReturned.destroyAll() instead.
        "prototype$__delete__cartridgesReturned": {
          url: urlBase + "/customers/:id/cartridgesReturned",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.filamentChange.findById() instead.
        "prototype$__findById__filamentChange": {
          url: urlBase + "/customers/:id/filamentChange/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.filamentChange.destroyById() instead.
        "prototype$__destroyById__filamentChange": {
          url: urlBase + "/customers/:id/filamentChange/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.filamentChange.updateById() instead.
        "prototype$__updateById__filamentChange": {
          url: urlBase + "/customers/:id/filamentChange/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.filamentChange() instead.
        "prototype$__get__filamentChange": {
          url: urlBase + "/customers/:id/filamentChange",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.filamentChange.create() instead.
        "prototype$__create__filamentChange": {
          url: urlBase + "/customers/:id/filamentChange",
          method: "POST",
        },

        // INTERNAL. Use Customer.filamentChange.destroyAll() instead.
        "prototype$__delete__filamentChange": {
          url: urlBase + "/customers/:id/filamentChange",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.hasMachines.findById() instead.
        "prototype$__findById__hasMachines": {
          url: urlBase + "/customers/:id/hasMachines/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.hasMachines.destroyById() instead.
        "prototype$__destroyById__hasMachines": {
          url: urlBase + "/customers/:id/hasMachines/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.hasMachines.updateById() instead.
        "prototype$__updateById__hasMachines": {
          url: urlBase + "/customers/:id/hasMachines/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.hasMachines() instead.
        "prototype$__get__hasMachines": {
          url: urlBase + "/customers/:id/hasMachines",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.hasMachines.create() instead.
        "prototype$__create__hasMachines": {
          url: urlBase + "/customers/:id/hasMachines",
          method: "POST",
        },

        // INTERNAL. Use Customer.hasMachines.destroyAll() instead.
        "prototype$__delete__hasMachines": {
          url: urlBase + "/customers/:id/hasMachines",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.machinesReturned.findById() instead.
        "prototype$__findById__machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.machinesReturned.destroyById() instead.
        "prototype$__destroyById__machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.machinesReturned.updateById() instead.
        "prototype$__updateById__machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.machinesReturned.link() instead.
        "prototype$__link__machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.machinesReturned.unlink() instead.
        "prototype$__unlink__machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.machinesReturned() instead.
        "prototype$__get__machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.machinesReturned.create() instead.
        "prototype$__create__machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned",
          method: "POST",
        },

        // INTERNAL. Use Customer.machinesReturned.destroyAll() instead.
        "prototype$__delete__machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.order.findById() instead.
        "prototype$__findById__order": {
          url: urlBase + "/customers/:id/order/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.order.destroyById() instead.
        "prototype$__destroyById__order": {
          url: urlBase + "/customers/:id/order/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.order.updateById() instead.
        "prototype$__updateById__order": {
          url: urlBase + "/customers/:id/order/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.order() instead.
        "prototype$__get__order": {
          url: urlBase + "/customers/:id/order",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.order.create() instead.
        "prototype$__create__order": {
          url: urlBase + "/customers/:id/order",
          method: "POST",
        },

        // INTERNAL. Use Customer.order.destroyAll() instead.
        "prototype$__delete__order": {
          url: urlBase + "/customers/:id/order",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.subscription.findById() instead.
        "prototype$__findById__subscription": {
          url: urlBase + "/customers/:id/subscription/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.subscription.destroyById() instead.
        "prototype$__destroyById__subscription": {
          url: urlBase + "/customers/:id/subscription/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.subscription.updateById() instead.
        "prototype$__updateById__subscription": {
          url: urlBase + "/customers/:id/subscription/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.subscription() instead.
        "prototype$__get__subscription": {
          url: urlBase + "/customers/:id/subscription",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.subscription.create() instead.
        "prototype$__create__subscription": {
          url: urlBase + "/customers/:id/subscription",
          method: "POST",
        },

        // INTERNAL. Use Customer.subscription.destroyAll() instead.
        "prototype$__delete__subscription": {
          url: urlBase + "/customers/:id/subscription",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.currentSubscription() instead.
        "prototype$__get__currentSubscription": {
          url: urlBase + "/customers/:id/currentSubscription",
          method: "GET",
        },

        // INTERNAL. Use Customer.machineSwap.findById() instead.
        "prototype$__findById__machineSwap": {
          url: urlBase + "/customers/:id/machineSwap/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.machineSwap.destroyById() instead.
        "prototype$__destroyById__machineSwap": {
          url: urlBase + "/customers/:id/machineSwap/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.machineSwap.updateById() instead.
        "prototype$__updateById__machineSwap": {
          url: urlBase + "/customers/:id/machineSwap/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.machineSwap() instead.
        "prototype$__get__machineSwap": {
          url: urlBase + "/customers/:id/machineSwap",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.machineSwap.create() instead.
        "prototype$__create__machineSwap": {
          url: urlBase + "/customers/:id/machineSwap",
          method: "POST",
        },

        // INTERNAL. Use Customer.machineSwap.destroyAll() instead.
        "prototype$__delete__machineSwap": {
          url: urlBase + "/customers/:id/machineSwap",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.swaps.findById() instead.
        "prototype$__findById__swaps": {
          url: urlBase + "/customers/:id/swaps/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.swaps.destroyById() instead.
        "prototype$__destroyById__swaps": {
          url: urlBase + "/customers/:id/swaps/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.swaps.updateById() instead.
        "prototype$__updateById__swaps": {
          url: urlBase + "/customers/:id/swaps/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.swaps() instead.
        "prototype$__get__swaps": {
          url: urlBase + "/customers/:id/swaps",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.swaps.create() instead.
        "prototype$__create__swaps": {
          url: urlBase + "/customers/:id/swaps",
          method: "POST",
        },

        // INTERNAL. Use Customer.swaps.destroyAll() instead.
        "prototype$__delete__swaps": {
          url: urlBase + "/customers/:id/swaps",
          method: "DELETE",
        },

        // INTERNAL. Use Cartridge.customer() instead.
        "::get::cartridge::customer": {
          url: urlBase + "/cartridges/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use CartridgeCredit.customer() instead.
        "::get::cartridgeCredit::customer": {
          url: urlBase + "/cartridgeCredits/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use CartridgeReturn.customer() instead.
        "::get::cartridgeReturn::customer": {
          url: urlBase + "/cartridgeReturns/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use FilamentChange.customer() instead.
        "::get::filamentChange::customer": {
          url: urlBase + "/filamentChanges/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use Machine.returnedBy.findById() instead.
        "::findById::machine::returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/:fk",
          method: "GET",
        },

        // INTERNAL. Use Machine.returnedBy.destroyById() instead.
        "::destroyById::machine::returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.returnedBy.updateById() instead.
        "::updateById::machine::returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Machine.returnedBy.link() instead.
        "::link::machine::returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Machine.returnedBy.unlink() instead.
        "::unlink::machine::returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.returnedBy() instead.
        "::get::machine::returnedBy": {
          url: urlBase + "/machines/:id/returnedBy",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Machine.returnedBy.create() instead.
        "::create::machine::returnedBy": {
          url: urlBase + "/machines/:id/returnedBy",
          method: "POST",
        },

        // INTERNAL. Use Machine.returnedBy.destroyAll() instead.
        "::delete::machine::returnedBy": {
          url: urlBase + "/machines/:id/returnedBy",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.currentCustomer() instead.
        "::get::machine::currentCustomer": {
          url: urlBase + "/machines/:id/currentCustomer",
          method: "GET",
        },

        // INTERNAL. Use Order.customer() instead.
        "::get::order::customer": {
          url: urlBase + "/orders/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use Subscription.customer() instead.
        "::get::subscription::customer": {
          url: urlBase + "/subscriptions/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use SubscriptionPlan.customers.findById() instead.
        "::findById::subscriptionPlan::customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/:fk",
          method: "GET",
        },

        // INTERNAL. Use SubscriptionPlan.customers.destroyById() instead.
        "::destroyById::subscriptionPlan::customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use SubscriptionPlan.customers.updateById() instead.
        "::updateById::subscriptionPlan::customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/:fk",
          method: "PUT",
        },

        // INTERNAL. Use SubscriptionPlan.customers.link() instead.
        "::link::subscriptionPlan::customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use SubscriptionPlan.customers.unlink() instead.
        "::unlink::subscriptionPlan::customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use SubscriptionPlan.customers() instead.
        "::get::subscriptionPlan::customers": {
          url: urlBase + "/subscriptionPlans/:id/customers",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use SubscriptionPlan.customers.create() instead.
        "::create::subscriptionPlan::customers": {
          url: urlBase + "/subscriptionPlans/:id/customers",
          method: "POST",
        },

        // INTERNAL. Use SubscriptionPlan.customers.destroyAll() instead.
        "::delete::subscriptionPlan::customers": {
          url: urlBase + "/subscriptionPlans/:id/customers",
          method: "DELETE",
        },

        // INTERNAL. Use Swap.customer() instead.
        "::get::swap::customer": {
          url: urlBase + "/swaps/:id/customer",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Customer#updateOrCreate
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Customer#destroyById
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Customer#removeById
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Customer#update
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];


    /**
     * @ngdoc object
     * @name lbServices.Customer.cartridge
     * @object
     * @description
     *
     * The object `Customer.cartridge` groups methods
     * manipulating `Cartridge` instances related to `Customer`.
     *
     * Use {@link lbServices.Customer#cartridge} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Customer#cartridge
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Queries cartridge of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        R.cartridge = function() {
          var TargetResource = $injector.get("Cartridge");
          var action = TargetResource["::get::customer::cartridge"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridge#create
         * @methodOf lbServices.Customer.cartridge
         *
         * @description
         *
         * Creates a new instance in cartridge of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        R.cartridge.create = function() {
          var TargetResource = $injector.get("Cartridge");
          var action = TargetResource["::create::customer::cartridge"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridge#destroyAll
         * @methodOf lbServices.Customer.cartridge
         *
         * @description
         *
         * Deletes all cartridge of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        R.cartridge.destroyAll = function() {
          var TargetResource = $injector.get("Cartridge");
          var action = TargetResource["::delete::customer::cartridge"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridge#destroyById
         * @methodOf lbServices.Customer.cartridge
         *
         * @description
         *
         * Delete a related item by id for cartridge
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for cartridge
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.cartridge.destroyById = function() {
          var TargetResource = $injector.get("Cartridge");
          var action = TargetResource["::destroyById::customer::cartridge"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridge#findById
         * @methodOf lbServices.Customer.cartridge
         *
         * @description
         *
         * Find a related item by id for cartridge
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for cartridge
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        R.cartridge.findById = function() {
          var TargetResource = $injector.get("Cartridge");
          var action = TargetResource["::findById::customer::cartridge"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridge#updateById
         * @methodOf lbServices.Customer.cartridge
         *
         * @description
         *
         * Update a related item by id for cartridge
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for cartridge
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Cartridge` object.)
         * </em>
         */
        R.cartridge.updateById = function() {
          var TargetResource = $injector.get("Cartridge");
          var action = TargetResource["::updateById::customer::cartridge"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Customer.cartridgesReturned
     * @object
     * @description
     *
     * The object `Customer.cartridgesReturned` groups methods
     * manipulating `CartridgeReturn` instances related to `Customer`.
     *
     * Use {@link lbServices.Customer#cartridgesReturned} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Customer#cartridgesReturned
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Queries cartridgesReturned of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::get::customer::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridgesReturned#create
         * @methodOf lbServices.Customer.cartridgesReturned
         *
         * @description
         *
         * Creates a new instance in cartridgesReturned of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned.create = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::create::customer::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridgesReturned#destroyAll
         * @methodOf lbServices.Customer.cartridgesReturned
         *
         * @description
         *
         * Deletes all cartridgesReturned of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned.destroyAll = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::delete::customer::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridgesReturned#destroyById
         * @methodOf lbServices.Customer.cartridgesReturned
         *
         * @description
         *
         * Delete a related item by id for cartridgesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for cartridgesReturned
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.cartridgesReturned.destroyById = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::destroyById::customer::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridgesReturned#findById
         * @methodOf lbServices.Customer.cartridgesReturned
         *
         * @description
         *
         * Find a related item by id for cartridgesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for cartridgesReturned
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned.findById = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::findById::customer::cartridgesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.cartridgesReturned#updateById
         * @methodOf lbServices.Customer.cartridgesReturned
         *
         * @description
         *
         * Update a related item by id for cartridgesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for cartridgesReturned
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CartridgeReturn` object.)
         * </em>
         */
        R.cartridgesReturned.updateById = function() {
          var TargetResource = $injector.get("CartridgeReturn");
          var action = TargetResource["::updateById::customer::cartridgesReturned"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Customer.filamentChange
     * @object
     * @description
     *
     * The object `Customer.filamentChange` groups methods
     * manipulating `FilamentChange` instances related to `Customer`.
     *
     * Use {@link lbServices.Customer#filamentChange} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Customer#filamentChange
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Queries filamentChange of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChange = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::get::customer::filamentChange"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.filamentChange#create
         * @methodOf lbServices.Customer.filamentChange
         *
         * @description
         *
         * Creates a new instance in filamentChange of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChange.create = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::create::customer::filamentChange"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.filamentChange#destroyAll
         * @methodOf lbServices.Customer.filamentChange
         *
         * @description
         *
         * Deletes all filamentChange of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChange.destroyAll = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::delete::customer::filamentChange"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.filamentChange#destroyById
         * @methodOf lbServices.Customer.filamentChange
         *
         * @description
         *
         * Delete a related item by id for filamentChange
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for filamentChange
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.filamentChange.destroyById = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::destroyById::customer::filamentChange"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.filamentChange#findById
         * @methodOf lbServices.Customer.filamentChange
         *
         * @description
         *
         * Find a related item by id for filamentChange
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for filamentChange
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChange.findById = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::findById::customer::filamentChange"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.filamentChange#updateById
         * @methodOf lbServices.Customer.filamentChange
         *
         * @description
         *
         * Update a related item by id for filamentChange
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for filamentChange
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChange.updateById = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::updateById::customer::filamentChange"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Customer.hasMachines
     * @object
     * @description
     *
     * The object `Customer.hasMachines` groups methods
     * manipulating `Machine` instances related to `Customer`.
     *
     * Use {@link lbServices.Customer#hasMachines} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Customer#hasMachines
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Queries hasMachines of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.hasMachines = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::get::customer::hasMachines"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.hasMachines#create
         * @methodOf lbServices.Customer.hasMachines
         *
         * @description
         *
         * Creates a new instance in hasMachines of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.hasMachines.create = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::create::customer::hasMachines"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.hasMachines#destroyAll
         * @methodOf lbServices.Customer.hasMachines
         *
         * @description
         *
         * Deletes all hasMachines of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.hasMachines.destroyAll = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::delete::customer::hasMachines"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.hasMachines#destroyById
         * @methodOf lbServices.Customer.hasMachines
         *
         * @description
         *
         * Delete a related item by id for hasMachines
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for hasMachines
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.hasMachines.destroyById = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::destroyById::customer::hasMachines"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.hasMachines#findById
         * @methodOf lbServices.Customer.hasMachines
         *
         * @description
         *
         * Find a related item by id for hasMachines
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for hasMachines
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.hasMachines.findById = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::findById::customer::hasMachines"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.hasMachines#updateById
         * @methodOf lbServices.Customer.hasMachines
         *
         * @description
         *
         * Update a related item by id for hasMachines
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for hasMachines
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.hasMachines.updateById = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::updateById::customer::hasMachines"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Customer.machinesReturned
     * @object
     * @description
     *
     * The object `Customer.machinesReturned` groups methods
     * manipulating `Machine` instances related to `Customer`.
     *
     * Use {@link lbServices.Customer#machinesReturned} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Customer#machinesReturned
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Queries machinesReturned of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.machinesReturned = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::get::customer::machinesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machinesReturned#create
         * @methodOf lbServices.Customer.machinesReturned
         *
         * @description
         *
         * Creates a new instance in machinesReturned of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.machinesReturned.create = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::create::customer::machinesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machinesReturned#destroyAll
         * @methodOf lbServices.Customer.machinesReturned
         *
         * @description
         *
         * Deletes all machinesReturned of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.machinesReturned.destroyAll = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::delete::customer::machinesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machinesReturned#destroyById
         * @methodOf lbServices.Customer.machinesReturned
         *
         * @description
         *
         * Delete a related item by id for machinesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for machinesReturned
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.machinesReturned.destroyById = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::destroyById::customer::machinesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machinesReturned#findById
         * @methodOf lbServices.Customer.machinesReturned
         *
         * @description
         *
         * Find a related item by id for machinesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for machinesReturned
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.machinesReturned.findById = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::findById::customer::machinesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machinesReturned#link
         * @methodOf lbServices.Customer.machinesReturned
         *
         * @description
         *
         * Add a related item by id for machinesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for machinesReturned
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.machinesReturned.link = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::link::customer::machinesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machinesReturned#unlink
         * @methodOf lbServices.Customer.machinesReturned
         *
         * @description
         *
         * Remove the machinesReturned relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for machinesReturned
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.machinesReturned.unlink = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::unlink::customer::machinesReturned"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machinesReturned#updateById
         * @methodOf lbServices.Customer.machinesReturned
         *
         * @description
         *
         * Update a related item by id for machinesReturned
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for machinesReturned
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.machinesReturned.updateById = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::updateById::customer::machinesReturned"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Customer.order
     * @object
     * @description
     *
     * The object `Customer.order` groups methods
     * manipulating `Order` instances related to `Customer`.
     *
     * Use {@link lbServices.Customer#order} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Customer#order
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Queries order of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        R.order = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::get::customer::order"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.order#create
         * @methodOf lbServices.Customer.order
         *
         * @description
         *
         * Creates a new instance in order of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        R.order.create = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::create::customer::order"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.order#destroyAll
         * @methodOf lbServices.Customer.order
         *
         * @description
         *
         * Deletes all order of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        R.order.destroyAll = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::delete::customer::order"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.order#destroyById
         * @methodOf lbServices.Customer.order
         *
         * @description
         *
         * Delete a related item by id for order
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for order
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.order.destroyById = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::destroyById::customer::order"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.order#findById
         * @methodOf lbServices.Customer.order
         *
         * @description
         *
         * Find a related item by id for order
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for order
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        R.order.findById = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::findById::customer::order"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.order#updateById
         * @methodOf lbServices.Customer.order
         *
         * @description
         *
         * Update a related item by id for order
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for order
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        R.order.updateById = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::updateById::customer::order"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Customer.subscription
     * @object
     * @description
     *
     * The object `Customer.subscription` groups methods
     * manipulating `Subscription` instances related to `Customer`.
     *
     * Use {@link lbServices.Customer#subscription} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Customer#subscription
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Queries subscription of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscription = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::get::customer::subscription"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.subscription#create
         * @methodOf lbServices.Customer.subscription
         *
         * @description
         *
         * Creates a new instance in subscription of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscription.create = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::create::customer::subscription"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.subscription#destroyAll
         * @methodOf lbServices.Customer.subscription
         *
         * @description
         *
         * Deletes all subscription of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscription.destroyAll = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::delete::customer::subscription"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.subscription#destroyById
         * @methodOf lbServices.Customer.subscription
         *
         * @description
         *
         * Delete a related item by id for subscription
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for subscription
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.subscription.destroyById = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::destroyById::customer::subscription"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.subscription#findById
         * @methodOf lbServices.Customer.subscription
         *
         * @description
         *
         * Find a related item by id for subscription
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for subscription
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscription.findById = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::findById::customer::subscription"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.subscription#updateById
         * @methodOf lbServices.Customer.subscription
         *
         * @description
         *
         * Update a related item by id for subscription
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for subscription
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscription.updateById = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::updateById::customer::subscription"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer#currentSubscription
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Fetches belongsTo relation currentSubscription
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.currentSubscription = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::get::customer::currentSubscription"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Customer.machineSwap
     * @object
     * @description
     *
     * The object `Customer.machineSwap` groups methods
     * manipulating `Swap` instances related to `Customer`.
     *
     * Use {@link lbServices.Customer#machineSwap} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Customer#machineSwap
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Queries machineSwap of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.machineSwap = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::get::customer::machineSwap"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machineSwap#create
         * @methodOf lbServices.Customer.machineSwap
         *
         * @description
         *
         * Creates a new instance in machineSwap of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.machineSwap.create = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::create::customer::machineSwap"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machineSwap#destroyAll
         * @methodOf lbServices.Customer.machineSwap
         *
         * @description
         *
         * Deletes all machineSwap of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.machineSwap.destroyAll = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::delete::customer::machineSwap"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machineSwap#destroyById
         * @methodOf lbServices.Customer.machineSwap
         *
         * @description
         *
         * Delete a related item by id for machineSwap
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for machineSwap
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.machineSwap.destroyById = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::destroyById::customer::machineSwap"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machineSwap#findById
         * @methodOf lbServices.Customer.machineSwap
         *
         * @description
         *
         * Find a related item by id for machineSwap
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for machineSwap
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.machineSwap.findById = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::findById::customer::machineSwap"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.machineSwap#updateById
         * @methodOf lbServices.Customer.machineSwap
         *
         * @description
         *
         * Update a related item by id for machineSwap
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for machineSwap
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.machineSwap.updateById = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::updateById::customer::machineSwap"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Customer.swaps
     * @object
     * @description
     *
     * The object `Customer.swaps` groups methods
     * manipulating `Swap` instances related to `Customer`.
     *
     * Use {@link lbServices.Customer#swaps} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Customer#swaps
         * @methodOf lbServices.Customer
         *
         * @description
         *
         * Queries swaps of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.swaps = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::get::customer::swaps"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.swaps#create
         * @methodOf lbServices.Customer.swaps
         *
         * @description
         *
         * Creates a new instance in swaps of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.swaps.create = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::create::customer::swaps"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.swaps#destroyAll
         * @methodOf lbServices.Customer.swaps
         *
         * @description
         *
         * Deletes all swaps of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.swaps.destroyAll = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::delete::customer::swaps"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.swaps#destroyById
         * @methodOf lbServices.Customer.swaps
         *
         * @description
         *
         * Delete a related item by id for swaps
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for swaps
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.swaps.destroyById = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::destroyById::customer::swaps"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.swaps#findById
         * @methodOf lbServices.Customer.swaps
         *
         * @description
         *
         * Find a related item by id for swaps
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for swaps
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.swaps.findById = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::findById::customer::swaps"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Customer.swaps#updateById
         * @methodOf lbServices.Customer.swaps
         *
         * @description
         *
         * Update a related item by id for swaps
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - customer id
         *
         *  - `fk` – `{*}` - Foreign key for swaps
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R.swaps.updateById = function() {
          var TargetResource = $injector.get("Swap");
          var action = TargetResource["::updateById::customer::swaps"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Filament
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Filament` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Filament",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/filaments/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Filament#create
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Filament` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/filaments",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Filament#upsert
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Filament` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/filaments",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Filament#exists
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/filaments/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Filament#findById
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Filament` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/filaments/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Filament#find
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Filament` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/filaments",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Filament#findOne
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Filament` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/filaments/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Filament#deleteById
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/filaments/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Filament#count
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/filaments/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Filament#updateAll
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/filaments/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Filament#prototype$updateAttributes
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filament id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Filament` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/filaments/:id",
          method: "PUT",
        },

        // INTERNAL. Use Filament.filamentChanges.findById() instead.
        "prototype$__findById__filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges/:fk",
          method: "GET",
        },

        // INTERNAL. Use Filament.filamentChanges.destroyById() instead.
        "prototype$__destroyById__filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Filament.filamentChanges.updateById() instead.
        "prototype$__updateById__filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Filament.filamentChanges() instead.
        "prototype$__get__filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Filament.filamentChanges.create() instead.
        "prototype$__create__filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges",
          method: "POST",
        },

        // INTERNAL. Use Filament.filamentChanges.destroyAll() instead.
        "prototype$__delete__filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges",
          method: "DELETE",
        },

        // INTERNAL. Use FilamentChange.filament() instead.
        "::get::filamentChange::filament": {
          url: urlBase + "/filamentChanges/:id/filament",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Filament#updateOrCreate
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Filament` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Filament#destroyById
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Filament#removeById
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Filament#update
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];


    /**
     * @ngdoc object
     * @name lbServices.Filament.filamentChanges
     * @object
     * @description
     *
     * The object `Filament.filamentChanges` groups methods
     * manipulating `FilamentChange` instances related to `Filament`.
     *
     * Use {@link lbServices.Filament#filamentChanges} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Filament#filamentChanges
         * @methodOf lbServices.Filament
         *
         * @description
         *
         * Queries filamentChanges of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filament id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::get::filament::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Filament.filamentChanges#create
         * @methodOf lbServices.Filament.filamentChanges
         *
         * @description
         *
         * Creates a new instance in filamentChanges of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filament id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges.create = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::create::filament::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Filament.filamentChanges#destroyAll
         * @methodOf lbServices.Filament.filamentChanges
         *
         * @description
         *
         * Deletes all filamentChanges of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filament id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges.destroyAll = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::delete::filament::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Filament.filamentChanges#destroyById
         * @methodOf lbServices.Filament.filamentChanges
         *
         * @description
         *
         * Delete a related item by id for filamentChanges
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filament id
         *
         *  - `fk` – `{*}` - Foreign key for filamentChanges
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.filamentChanges.destroyById = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::destroyById::filament::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Filament.filamentChanges#findById
         * @methodOf lbServices.Filament.filamentChanges
         *
         * @description
         *
         * Find a related item by id for filamentChanges
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filament id
         *
         *  - `fk` – `{*}` - Foreign key for filamentChanges
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges.findById = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::findById::filament::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Filament.filamentChanges#updateById
         * @methodOf lbServices.Filament.filamentChanges
         *
         * @description
         *
         * Update a related item by id for filamentChanges
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filament id
         *
         *  - `fk` – `{*}` - Foreign key for filamentChanges
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges.updateById = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::updateById::filament::filamentChanges"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.FilamentChange
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `FilamentChange` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "FilamentChange",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/filamentChanges/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#create
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/filamentChanges",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#upsert
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/filamentChanges",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#exists
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/filamentChanges/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#findById
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/filamentChanges/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#find
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/filamentChanges",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#findOne
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/filamentChanges/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#deleteById
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/filamentChanges/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#count
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/filamentChanges/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#updateAll
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/filamentChanges/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#prototype$updateAttributes
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filamentChange id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/filamentChanges/:id",
          method: "PUT",
        },

        // INTERNAL. Use FilamentChange.filament() instead.
        "prototype$__get__filament": {
          url: urlBase + "/filamentChanges/:id/filament",
          method: "GET",
        },

        // INTERNAL. Use FilamentChange.customer() instead.
        "prototype$__get__customer": {
          url: urlBase + "/filamentChanges/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use FilamentChange.machine() instead.
        "prototype$__get__machine": {
          url: urlBase + "/filamentChanges/:id/machine",
          method: "GET",
        },

        // INTERNAL. Use Customer.filamentChange.findById() instead.
        "::findById::customer::filamentChange": {
          url: urlBase + "/customers/:id/filamentChange/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.filamentChange.destroyById() instead.
        "::destroyById::customer::filamentChange": {
          url: urlBase + "/customers/:id/filamentChange/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.filamentChange.updateById() instead.
        "::updateById::customer::filamentChange": {
          url: urlBase + "/customers/:id/filamentChange/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.filamentChange() instead.
        "::get::customer::filamentChange": {
          url: urlBase + "/customers/:id/filamentChange",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.filamentChange.create() instead.
        "::create::customer::filamentChange": {
          url: urlBase + "/customers/:id/filamentChange",
          method: "POST",
        },

        // INTERNAL. Use Customer.filamentChange.destroyAll() instead.
        "::delete::customer::filamentChange": {
          url: urlBase + "/customers/:id/filamentChange",
          method: "DELETE",
        },

        // INTERNAL. Use Filament.filamentChanges.findById() instead.
        "::findById::filament::filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges/:fk",
          method: "GET",
        },

        // INTERNAL. Use Filament.filamentChanges.destroyById() instead.
        "::destroyById::filament::filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Filament.filamentChanges.updateById() instead.
        "::updateById::filament::filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Filament.filamentChanges() instead.
        "::get::filament::filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Filament.filamentChanges.create() instead.
        "::create::filament::filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges",
          method: "POST",
        },

        // INTERNAL. Use Filament.filamentChanges.destroyAll() instead.
        "::delete::filament::filamentChanges": {
          url: urlBase + "/filaments/:id/filamentChanges",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.filamentChanges.findById() instead.
        "::findById::machine::filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges/:fk",
          method: "GET",
        },

        // INTERNAL. Use Machine.filamentChanges.destroyById() instead.
        "::destroyById::machine::filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.filamentChanges.updateById() instead.
        "::updateById::machine::filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Machine.filamentChanges() instead.
        "::get::machine::filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Machine.filamentChanges.create() instead.
        "::create::machine::filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges",
          method: "POST",
        },

        // INTERNAL. Use Machine.filamentChanges.destroyAll() instead.
        "::delete::machine::filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges",
          method: "DELETE",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#updateOrCreate
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#destroyById
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#removeById
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#update
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#filament
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Fetches belongsTo relation filament
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filamentChange id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Filament` object.)
         * </em>
         */
        R.filament = function() {
          var TargetResource = $injector.get("Filament");
          var action = TargetResource["::get::filamentChange::filament"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#customer
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Fetches belongsTo relation customer
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filamentChange id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customer = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::filamentChange::customer"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.FilamentChange#machine
         * @methodOf lbServices.FilamentChange
         *
         * @description
         *
         * Fetches belongsTo relation machine
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - filamentChange id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.machine = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::get::filamentChange::machine"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Machine
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Machine` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Machine",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/machines/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Machine#create
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/machines",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Machine#upsert
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/machines",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Machine#exists
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/machines/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Machine#findById
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/machines/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Machine#find
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/machines",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Machine#findOne
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/machines/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Machine#deleteById
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/machines/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Machine#count
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/machines/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Machine#updateAll
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/machines/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Machine#prototype$updateAttributes
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/machines/:id",
          method: "PUT",
        },

        // INTERNAL. Use Machine.returnedBy.findById() instead.
        "prototype$__findById__returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/:fk",
          method: "GET",
        },

        // INTERNAL. Use Machine.returnedBy.destroyById() instead.
        "prototype$__destroyById__returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.returnedBy.updateById() instead.
        "prototype$__updateById__returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Machine.returnedBy.link() instead.
        "prototype$__link__returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Machine.returnedBy.unlink() instead.
        "prototype$__unlink__returnedBy": {
          url: urlBase + "/machines/:id/returnedBy/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.returnedBy() instead.
        "prototype$__get__returnedBy": {
          url: urlBase + "/machines/:id/returnedBy",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Machine.returnedBy.create() instead.
        "prototype$__create__returnedBy": {
          url: urlBase + "/machines/:id/returnedBy",
          method: "POST",
        },

        // INTERNAL. Use Machine.returnedBy.destroyAll() instead.
        "prototype$__delete__returnedBy": {
          url: urlBase + "/machines/:id/returnedBy",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.filamentChanges.findById() instead.
        "prototype$__findById__filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges/:fk",
          method: "GET",
        },

        // INTERNAL. Use Machine.filamentChanges.destroyById() instead.
        "prototype$__destroyById__filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.filamentChanges.updateById() instead.
        "prototype$__updateById__filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Machine.filamentChanges() instead.
        "prototype$__get__filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Machine.filamentChanges.create() instead.
        "prototype$__create__filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges",
          method: "POST",
        },

        // INTERNAL. Use Machine.filamentChanges.destroyAll() instead.
        "prototype$__delete__filamentChanges": {
          url: urlBase + "/machines/:id/filamentChanges",
          method: "DELETE",
        },

        // INTERNAL. Use Machine.currentCustomer() instead.
        "prototype$__get__currentCustomer": {
          url: urlBase + "/machines/:id/currentCustomer",
          method: "GET",
        },

        // INTERNAL. Use Customer.hasMachines.findById() instead.
        "::findById::customer::hasMachines": {
          url: urlBase + "/customers/:id/hasMachines/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.hasMachines.destroyById() instead.
        "::destroyById::customer::hasMachines": {
          url: urlBase + "/customers/:id/hasMachines/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.hasMachines.updateById() instead.
        "::updateById::customer::hasMachines": {
          url: urlBase + "/customers/:id/hasMachines/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.hasMachines() instead.
        "::get::customer::hasMachines": {
          url: urlBase + "/customers/:id/hasMachines",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.hasMachines.create() instead.
        "::create::customer::hasMachines": {
          url: urlBase + "/customers/:id/hasMachines",
          method: "POST",
        },

        // INTERNAL. Use Customer.hasMachines.destroyAll() instead.
        "::delete::customer::hasMachines": {
          url: urlBase + "/customers/:id/hasMachines",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.machinesReturned.findById() instead.
        "::findById::customer::machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.machinesReturned.destroyById() instead.
        "::destroyById::customer::machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.machinesReturned.updateById() instead.
        "::updateById::customer::machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.machinesReturned.link() instead.
        "::link::customer::machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.machinesReturned.unlink() instead.
        "::unlink::customer::machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.machinesReturned() instead.
        "::get::customer::machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.machinesReturned.create() instead.
        "::create::customer::machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned",
          method: "POST",
        },

        // INTERNAL. Use Customer.machinesReturned.destroyAll() instead.
        "::delete::customer::machinesReturned": {
          url: urlBase + "/customers/:id/machinesReturned",
          method: "DELETE",
        },

        // INTERNAL. Use FilamentChange.machine() instead.
        "::get::filamentChange::machine": {
          url: urlBase + "/filamentChanges/:id/machine",
          method: "GET",
        },

        // INTERNAL. Use Swap.oldMachine() instead.
        "::get::swap::oldMachine": {
          url: urlBase + "/swaps/:id/oldMachine",
          method: "GET",
        },

        // INTERNAL. Use Swap.newMachine() instead.
        "::get::swap::newMachine": {
          url: urlBase + "/swaps/:id/newMachine",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Machine#updateOrCreate
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Machine#destroyById
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Machine#removeById
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Machine#update
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];


    /**
     * @ngdoc object
     * @name lbServices.Machine.returnedBy
     * @object
     * @description
     *
     * The object `Machine.returnedBy` groups methods
     * manipulating `Customer` instances related to `Machine`.
     *
     * Use {@link lbServices.Machine#returnedBy} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Machine#returnedBy
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Queries returnedBy of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.returnedBy = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::machine::returnedBy"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.returnedBy#create
         * @methodOf lbServices.Machine.returnedBy
         *
         * @description
         *
         * Creates a new instance in returnedBy of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.returnedBy.create = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::create::machine::returnedBy"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.returnedBy#destroyAll
         * @methodOf lbServices.Machine.returnedBy
         *
         * @description
         *
         * Deletes all returnedBy of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.returnedBy.destroyAll = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::delete::machine::returnedBy"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.returnedBy#destroyById
         * @methodOf lbServices.Machine.returnedBy
         *
         * @description
         *
         * Delete a related item by id for returnedBy
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `fk` – `{*}` - Foreign key for returnedBy
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.returnedBy.destroyById = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::destroyById::machine::returnedBy"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.returnedBy#findById
         * @methodOf lbServices.Machine.returnedBy
         *
         * @description
         *
         * Find a related item by id for returnedBy
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `fk` – `{*}` - Foreign key for returnedBy
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.returnedBy.findById = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::findById::machine::returnedBy"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.returnedBy#link
         * @methodOf lbServices.Machine.returnedBy
         *
         * @description
         *
         * Add a related item by id for returnedBy
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `fk` – `{*}` - Foreign key for returnedBy
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.returnedBy.link = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::link::machine::returnedBy"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.returnedBy#unlink
         * @methodOf lbServices.Machine.returnedBy
         *
         * @description
         *
         * Remove the returnedBy relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `fk` – `{*}` - Foreign key for returnedBy
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.returnedBy.unlink = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::unlink::machine::returnedBy"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.returnedBy#updateById
         * @methodOf lbServices.Machine.returnedBy
         *
         * @description
         *
         * Update a related item by id for returnedBy
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `fk` – `{*}` - Foreign key for returnedBy
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.returnedBy.updateById = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::updateById::machine::returnedBy"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Machine.filamentChanges
     * @object
     * @description
     *
     * The object `Machine.filamentChanges` groups methods
     * manipulating `FilamentChange` instances related to `Machine`.
     *
     * Use {@link lbServices.Machine#filamentChanges} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Machine#filamentChanges
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Queries filamentChanges of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::get::machine::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.filamentChanges#create
         * @methodOf lbServices.Machine.filamentChanges
         *
         * @description
         *
         * Creates a new instance in filamentChanges of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges.create = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::create::machine::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.filamentChanges#destroyAll
         * @methodOf lbServices.Machine.filamentChanges
         *
         * @description
         *
         * Deletes all filamentChanges of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges.destroyAll = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::delete::machine::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.filamentChanges#destroyById
         * @methodOf lbServices.Machine.filamentChanges
         *
         * @description
         *
         * Delete a related item by id for filamentChanges
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `fk` – `{*}` - Foreign key for filamentChanges
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.filamentChanges.destroyById = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::destroyById::machine::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.filamentChanges#findById
         * @methodOf lbServices.Machine.filamentChanges
         *
         * @description
         *
         * Find a related item by id for filamentChanges
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `fk` – `{*}` - Foreign key for filamentChanges
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges.findById = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::findById::machine::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine.filamentChanges#updateById
         * @methodOf lbServices.Machine.filamentChanges
         *
         * @description
         *
         * Update a related item by id for filamentChanges
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `fk` – `{*}` - Foreign key for filamentChanges
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `FilamentChange` object.)
         * </em>
         */
        R.filamentChanges.updateById = function() {
          var TargetResource = $injector.get("FilamentChange");
          var action = TargetResource["::updateById::machine::filamentChanges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Machine#currentCustomer
         * @methodOf lbServices.Machine
         *
         * @description
         *
         * Fetches belongsTo relation currentCustomer
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - machine id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.currentCustomer = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::machine::currentCustomer"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Order
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Order` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Order",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/orders/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Order#create
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/orders",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#upsert
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/orders",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#exists
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/orders/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#findById
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/orders/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#find
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/orders",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#findOne
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/orders/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#deleteById
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/orders/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#count
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/orders/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#updateAll
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/orders/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#prototype$updateAttributes
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - order id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/orders/:id",
          method: "PUT",
        },

        // INTERNAL. Use Order.customer() instead.
        "prototype$__get__customer": {
          url: urlBase + "/orders/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use Order.shipments.findById() instead.
        "prototype$__findById__shipments": {
          url: urlBase + "/orders/:id/shipments/:fk",
          method: "GET",
        },

        // INTERNAL. Use Order.shipments.destroyById() instead.
        "prototype$__destroyById__shipments": {
          url: urlBase + "/orders/:id/shipments/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Order.shipments.updateById() instead.
        "prototype$__updateById__shipments": {
          url: urlBase + "/orders/:id/shipments/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Order.shipments() instead.
        "prototype$__get__shipments": {
          url: urlBase + "/orders/:id/shipments",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Order.shipments.create() instead.
        "prototype$__create__shipments": {
          url: urlBase + "/orders/:id/shipments",
          method: "POST",
        },

        // INTERNAL. Use Order.shipments.destroyAll() instead.
        "prototype$__delete__shipments": {
          url: urlBase + "/orders/:id/shipments",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.order.findById() instead.
        "::findById::customer::order": {
          url: urlBase + "/customers/:id/order/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.order.destroyById() instead.
        "::destroyById::customer::order": {
          url: urlBase + "/customers/:id/order/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.order.updateById() instead.
        "::updateById::customer::order": {
          url: urlBase + "/customers/:id/order/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.order() instead.
        "::get::customer::order": {
          url: urlBase + "/customers/:id/order",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.order.create() instead.
        "::create::customer::order": {
          url: urlBase + "/customers/:id/order",
          method: "POST",
        },

        // INTERNAL. Use Customer.order.destroyAll() instead.
        "::delete::customer::order": {
          url: urlBase + "/customers/:id/order",
          method: "DELETE",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Order#updateOrCreate
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Order` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Order#destroyById
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Order#removeById
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Order#update
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



        /**
         * @ngdoc method
         * @name lbServices.Order#customer
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Fetches belongsTo relation customer
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - order id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customer = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::order::customer"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Order.shipments
     * @object
     * @description
     *
     * The object `Order.shipments` groups methods
     * manipulating `Shipment` instances related to `Order`.
     *
     * Use {@link lbServices.Order#shipments} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Order#shipments
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Queries shipments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - order id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        R.shipments = function() {
          var TargetResource = $injector.get("Shipment");
          var action = TargetResource["::get::order::shipments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Order.shipments#create
         * @methodOf lbServices.Order.shipments
         *
         * @description
         *
         * Creates a new instance in shipments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - order id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        R.shipments.create = function() {
          var TargetResource = $injector.get("Shipment");
          var action = TargetResource["::create::order::shipments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Order.shipments#destroyAll
         * @methodOf lbServices.Order.shipments
         *
         * @description
         *
         * Deletes all shipments of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - order id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        R.shipments.destroyAll = function() {
          var TargetResource = $injector.get("Shipment");
          var action = TargetResource["::delete::order::shipments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Order.shipments#destroyById
         * @methodOf lbServices.Order.shipments
         *
         * @description
         *
         * Delete a related item by id for shipments
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - order id
         *
         *  - `fk` – `{*}` - Foreign key for shipments
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.shipments.destroyById = function() {
          var TargetResource = $injector.get("Shipment");
          var action = TargetResource["::destroyById::order::shipments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Order.shipments#findById
         * @methodOf lbServices.Order.shipments
         *
         * @description
         *
         * Find a related item by id for shipments
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - order id
         *
         *  - `fk` – `{*}` - Foreign key for shipments
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        R.shipments.findById = function() {
          var TargetResource = $injector.get("Shipment");
          var action = TargetResource["::findById::order::shipments"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Order.shipments#updateById
         * @methodOf lbServices.Order.shipments
         *
         * @description
         *
         * Update a related item by id for shipments
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - order id
         *
         *  - `fk` – `{*}` - Foreign key for shipments
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        R.shipments.updateById = function() {
          var TargetResource = $injector.get("Shipment");
          var action = TargetResource["::updateById::order::shipments"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Part
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Part` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Part",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/parts/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Part#create
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/parts",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Part#upsert
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/parts",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Part#exists
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/parts/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Part#findById
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/parts/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Part#find
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/parts",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Part#findOne
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/parts/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Part#deleteById
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/parts/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Part#count
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/parts/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Part#updateAll
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/parts/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Part#prototype$updateAttributes
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - part id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/parts/:id",
          method: "PUT",
        },

        // INTERNAL. Use Part.vendorOrder.findById() instead.
        "prototype$__findById__vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/:fk",
          method: "GET",
        },

        // INTERNAL. Use Part.vendorOrder.destroyById() instead.
        "prototype$__destroyById__vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Part.vendorOrder.updateById() instead.
        "prototype$__updateById__vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Part.vendorOrder.link() instead.
        "prototype$__link__vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Part.vendorOrder.unlink() instead.
        "prototype$__unlink__vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Part.vendorOrder() instead.
        "prototype$__get__vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Part.vendorOrder.create() instead.
        "prototype$__create__vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder",
          method: "POST",
        },

        // INTERNAL. Use Part.vendorOrder.destroyAll() instead.
        "prototype$__delete__vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder",
          method: "DELETE",
        },

        // INTERNAL. Use VendorOrder.part.findById() instead.
        "::findById::vendorOrder::part": {
          url: urlBase + "/vendorOrders/:id/part/:fk",
          method: "GET",
        },

        // INTERNAL. Use VendorOrder.part.destroyById() instead.
        "::destroyById::vendorOrder::part": {
          url: urlBase + "/vendorOrders/:id/part/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use VendorOrder.part.updateById() instead.
        "::updateById::vendorOrder::part": {
          url: urlBase + "/vendorOrders/:id/part/:fk",
          method: "PUT",
        },

        // INTERNAL. Use VendorOrder.part.link() instead.
        "::link::vendorOrder::part": {
          url: urlBase + "/vendorOrders/:id/part/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use VendorOrder.part.unlink() instead.
        "::unlink::vendorOrder::part": {
          url: urlBase + "/vendorOrders/:id/part/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use VendorOrder.part() instead.
        "::get::vendorOrder::part": {
          url: urlBase + "/vendorOrders/:id/part",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use VendorOrder.part.create() instead.
        "::create::vendorOrder::part": {
          url: urlBase + "/vendorOrders/:id/part",
          method: "POST",
        },

        // INTERNAL. Use VendorOrder.part.destroyAll() instead.
        "::delete::vendorOrder::part": {
          url: urlBase + "/vendorOrders/:id/part",
          method: "DELETE",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Part#updateOrCreate
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Part#destroyById
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Part#removeById
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Part#update
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];


    /**
     * @ngdoc object
     * @name lbServices.Part.vendorOrder
     * @object
     * @description
     *
     * The object `Part.vendorOrder` groups methods
     * manipulating `Vendororder` instances related to `Part`.
     *
     * Use {@link lbServices.Part#vendorOrder} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Part#vendorOrder
         * @methodOf lbServices.Part
         *
         * @description
         *
         * Queries vendorOrder of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - part id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendororder` object.)
         * </em>
         */
        R.vendorOrder = function() {
          var TargetResource = $injector.get("Vendororder");
          var action = TargetResource["::get::part::vendorOrder"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Part.vendorOrder#create
         * @methodOf lbServices.Part.vendorOrder
         *
         * @description
         *
         * Creates a new instance in vendorOrder of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - part id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendororder` object.)
         * </em>
         */
        R.vendorOrder.create = function() {
          var TargetResource = $injector.get("Vendororder");
          var action = TargetResource["::create::part::vendorOrder"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Part.vendorOrder#destroyAll
         * @methodOf lbServices.Part.vendorOrder
         *
         * @description
         *
         * Deletes all vendorOrder of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - part id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendororder` object.)
         * </em>
         */
        R.vendorOrder.destroyAll = function() {
          var TargetResource = $injector.get("Vendororder");
          var action = TargetResource["::delete::part::vendorOrder"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Part.vendorOrder#destroyById
         * @methodOf lbServices.Part.vendorOrder
         *
         * @description
         *
         * Delete a related item by id for vendorOrder
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - part id
         *
         *  - `fk` – `{*}` - Foreign key for vendorOrder
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.vendorOrder.destroyById = function() {
          var TargetResource = $injector.get("Vendororder");
          var action = TargetResource["::destroyById::part::vendorOrder"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Part.vendorOrder#findById
         * @methodOf lbServices.Part.vendorOrder
         *
         * @description
         *
         * Find a related item by id for vendorOrder
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - part id
         *
         *  - `fk` – `{*}` - Foreign key for vendorOrder
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendororder` object.)
         * </em>
         */
        R.vendorOrder.findById = function() {
          var TargetResource = $injector.get("Vendororder");
          var action = TargetResource["::findById::part::vendorOrder"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Part.vendorOrder#link
         * @methodOf lbServices.Part.vendorOrder
         *
         * @description
         *
         * Add a related item by id for vendorOrder
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - part id
         *
         *  - `fk` – `{*}` - Foreign key for vendorOrder
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendororder` object.)
         * </em>
         */
        R.vendorOrder.link = function() {
          var TargetResource = $injector.get("Vendororder");
          var action = TargetResource["::link::part::vendorOrder"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Part.vendorOrder#unlink
         * @methodOf lbServices.Part.vendorOrder
         *
         * @description
         *
         * Remove the vendorOrder relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - part id
         *
         *  - `fk` – `{*}` - Foreign key for vendorOrder
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.vendorOrder.unlink = function() {
          var TargetResource = $injector.get("Vendororder");
          var action = TargetResource["::unlink::part::vendorOrder"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Part.vendorOrder#updateById
         * @methodOf lbServices.Part.vendorOrder
         *
         * @description
         *
         * Update a related item by id for vendorOrder
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - part id
         *
         *  - `fk` – `{*}` - Foreign key for vendorOrder
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendororder` object.)
         * </em>
         */
        R.vendorOrder.updateById = function() {
          var TargetResource = $injector.get("Vendororder");
          var action = TargetResource["::updateById::part::vendorOrder"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Print
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Print` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Print",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/prints/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Print#create
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Print` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/prints",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Print#upsert
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Print` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/prints",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Print#exists
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/prints/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Print#findById
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Print` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/prints/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Print#find
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Print` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/prints",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Print#findOne
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Print` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/prints/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Print#deleteById
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/prints/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Print#count
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/prints/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Print#updateAll
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/prints/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Print#prototype$updateAttributes
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - print id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Print` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/prints/:id",
          method: "PUT",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Print#updateOrCreate
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Print` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Print#destroyById
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Print#removeById
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Print#update
         * @methodOf lbServices.Print
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Scanner
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Scanner` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Scanner",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/scanners/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Scanner#create
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Scanner` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/scanners",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Scanner#upsert
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Scanner` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/scanners",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Scanner#exists
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/scanners/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Scanner#findById
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Scanner` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/scanners/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Scanner#find
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Scanner` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/scanners",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Scanner#findOne
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Scanner` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/scanners/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Scanner#deleteById
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/scanners/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Scanner#count
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/scanners/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Scanner#updateAll
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/scanners/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Scanner#prototype$updateAttributes
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - scanner id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Scanner` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/scanners/:id",
          method: "PUT",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Scanner#updateOrCreate
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Scanner` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Scanner#destroyById
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Scanner#removeById
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Scanner#update
         * @methodOf lbServices.Scanner
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Shipment
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Shipment` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Shipment",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/shipments/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Shipment#create
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/shipments",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Shipment#upsert
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/shipments",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Shipment#exists
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/shipments/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Shipment#findById
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/shipments/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Shipment#find
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/shipments",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Shipment#findOne
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/shipments/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Shipment#deleteById
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/shipments/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Shipment#count
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/shipments/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Shipment#updateAll
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/shipments/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Shipment#prototype$updateAttributes
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - shipment id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/shipments/:id",
          method: "PUT",
        },

        // INTERNAL. Use Order.shipments.findById() instead.
        "::findById::order::shipments": {
          url: urlBase + "/orders/:id/shipments/:fk",
          method: "GET",
        },

        // INTERNAL. Use Order.shipments.destroyById() instead.
        "::destroyById::order::shipments": {
          url: urlBase + "/orders/:id/shipments/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Order.shipments.updateById() instead.
        "::updateById::order::shipments": {
          url: urlBase + "/orders/:id/shipments/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Order.shipments() instead.
        "::get::order::shipments": {
          url: urlBase + "/orders/:id/shipments",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Order.shipments.create() instead.
        "::create::order::shipments": {
          url: urlBase + "/orders/:id/shipments",
          method: "POST",
        },

        // INTERNAL. Use Order.shipments.destroyAll() instead.
        "::delete::order::shipments": {
          url: urlBase + "/orders/:id/shipments",
          method: "DELETE",
        },

        // INTERNAL. Use Swap.shipment() instead.
        "::get::swap::shipment": {
          url: urlBase + "/swaps/:id/shipment",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Shipment#updateOrCreate
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Shipment#destroyById
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Shipment#removeById
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Shipment#update
         * @methodOf lbServices.Shipment
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Subscription
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Subscription` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Subscription",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/subscriptions/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Subscription#create
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/subscriptions",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscription#upsert
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/subscriptions",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscription#exists
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/subscriptions/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscription#findById
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/subscriptions/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscription#find
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/subscriptions",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscription#findOne
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/subscriptions/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscription#deleteById
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/subscriptions/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscription#count
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/subscriptions/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscription#updateAll
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/subscriptions/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscription#prototype$updateAttributes
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscription id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/subscriptions/:id",
          method: "PUT",
        },

        // INTERNAL. Use Subscription.customer() instead.
        "prototype$__get__customer": {
          url: urlBase + "/subscriptions/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use Subscription.subscriptionPlan() instead.
        "prototype$__get__subscriptionPlan": {
          url: urlBase + "/subscriptions/:id/subscriptionPlan",
          method: "GET",
        },

        // INTERNAL. Use Customer.subscription.findById() instead.
        "::findById::customer::subscription": {
          url: urlBase + "/customers/:id/subscription/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.subscription.destroyById() instead.
        "::destroyById::customer::subscription": {
          url: urlBase + "/customers/:id/subscription/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.subscription.updateById() instead.
        "::updateById::customer::subscription": {
          url: urlBase + "/customers/:id/subscription/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.subscription() instead.
        "::get::customer::subscription": {
          url: urlBase + "/customers/:id/subscription",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.subscription.create() instead.
        "::create::customer::subscription": {
          url: urlBase + "/customers/:id/subscription",
          method: "POST",
        },

        // INTERNAL. Use Customer.subscription.destroyAll() instead.
        "::delete::customer::subscription": {
          url: urlBase + "/customers/:id/subscription",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.currentSubscription() instead.
        "::get::customer::currentSubscription": {
          url: urlBase + "/customers/:id/currentSubscription",
          method: "GET",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.findById() instead.
        "::findById::subscriptionPlan::subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions/:fk",
          method: "GET",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.destroyById() instead.
        "::destroyById::subscriptionPlan::subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.updateById() instead.
        "::updateById::subscriptionPlan::subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions/:fk",
          method: "PUT",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions() instead.
        "::get::subscriptionPlan::subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.create() instead.
        "::create::subscriptionPlan::subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions",
          method: "POST",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.destroyAll() instead.
        "::delete::subscriptionPlan::subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions",
          method: "DELETE",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Subscription#updateOrCreate
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Subscription#destroyById
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Subscription#removeById
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Subscription#update
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



        /**
         * @ngdoc method
         * @name lbServices.Subscription#customer
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Fetches belongsTo relation customer
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscription id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customer = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::subscription::customer"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscription#subscriptionPlan
         * @methodOf lbServices.Subscription
         *
         * @description
         *
         * Fetches belongsTo relation subscriptionPlan
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscription id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SubscriptionPlan` object.)
         * </em>
         */
        R.subscriptionPlan = function() {
          var TargetResource = $injector.get("SubscriptionPlan");
          var action = TargetResource["::get::subscription::subscriptionPlan"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.SubscriptionPlan
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `SubscriptionPlan` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "SubscriptionPlan",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/subscriptionPlans/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#create
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SubscriptionPlan` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/subscriptionPlans",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#upsert
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SubscriptionPlan` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/subscriptionPlans",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#exists
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/subscriptionPlans/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#findById
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SubscriptionPlan` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/subscriptionPlans/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#find
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SubscriptionPlan` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/subscriptionPlans",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#findOne
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SubscriptionPlan` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/subscriptionPlans/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#deleteById
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/subscriptionPlans/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#count
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/subscriptionPlans/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#updateAll
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/subscriptionPlans/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#prototype$updateAttributes
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SubscriptionPlan` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/subscriptionPlans/:id",
          method: "PUT",
        },

        // INTERNAL. Use SubscriptionPlan.customers.findById() instead.
        "prototype$__findById__customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/:fk",
          method: "GET",
        },

        // INTERNAL. Use SubscriptionPlan.customers.destroyById() instead.
        "prototype$__destroyById__customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use SubscriptionPlan.customers.updateById() instead.
        "prototype$__updateById__customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/:fk",
          method: "PUT",
        },

        // INTERNAL. Use SubscriptionPlan.customers.link() instead.
        "prototype$__link__customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use SubscriptionPlan.customers.unlink() instead.
        "prototype$__unlink__customers": {
          url: urlBase + "/subscriptionPlans/:id/customers/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use SubscriptionPlan.customers() instead.
        "prototype$__get__customers": {
          url: urlBase + "/subscriptionPlans/:id/customers",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use SubscriptionPlan.customers.create() instead.
        "prototype$__create__customers": {
          url: urlBase + "/subscriptionPlans/:id/customers",
          method: "POST",
        },

        // INTERNAL. Use SubscriptionPlan.customers.destroyAll() instead.
        "prototype$__delete__customers": {
          url: urlBase + "/subscriptionPlans/:id/customers",
          method: "DELETE",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.findById() instead.
        "prototype$__findById__subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions/:fk",
          method: "GET",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.destroyById() instead.
        "prototype$__destroyById__subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.updateById() instead.
        "prototype$__updateById__subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions/:fk",
          method: "PUT",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions() instead.
        "prototype$__get__subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.create() instead.
        "prototype$__create__subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions",
          method: "POST",
        },

        // INTERNAL. Use SubscriptionPlan.subscriptions.destroyAll() instead.
        "prototype$__delete__subscriptions": {
          url: urlBase + "/subscriptionPlans/:id/subscriptions",
          method: "DELETE",
        },

        // INTERNAL. Use Subscription.subscriptionPlan() instead.
        "::get::subscription::subscriptionPlan": {
          url: urlBase + "/subscriptions/:id/subscriptionPlan",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#updateOrCreate
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SubscriptionPlan` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#destroyById
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#removeById
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#update
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];


    /**
     * @ngdoc object
     * @name lbServices.SubscriptionPlan.customers
     * @object
     * @description
     *
     * The object `SubscriptionPlan.customers` groups methods
     * manipulating `Customer` instances related to `SubscriptionPlan`.
     *
     * Use {@link lbServices.SubscriptionPlan#customers} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#customers
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Queries customers of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customers = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::subscriptionPlan::customers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.customers#create
         * @methodOf lbServices.SubscriptionPlan.customers
         *
         * @description
         *
         * Creates a new instance in customers of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customers.create = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::create::subscriptionPlan::customers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.customers#destroyAll
         * @methodOf lbServices.SubscriptionPlan.customers
         *
         * @description
         *
         * Deletes all customers of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customers.destroyAll = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::delete::subscriptionPlan::customers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.customers#destroyById
         * @methodOf lbServices.SubscriptionPlan.customers
         *
         * @description
         *
         * Delete a related item by id for customers
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `fk` – `{*}` - Foreign key for customers
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.customers.destroyById = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::destroyById::subscriptionPlan::customers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.customers#findById
         * @methodOf lbServices.SubscriptionPlan.customers
         *
         * @description
         *
         * Find a related item by id for customers
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `fk` – `{*}` - Foreign key for customers
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customers.findById = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::findById::subscriptionPlan::customers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.customers#link
         * @methodOf lbServices.SubscriptionPlan.customers
         *
         * @description
         *
         * Add a related item by id for customers
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `fk` – `{*}` - Foreign key for customers
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customers.link = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::link::subscriptionPlan::customers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.customers#unlink
         * @methodOf lbServices.SubscriptionPlan.customers
         *
         * @description
         *
         * Remove the customers relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `fk` – `{*}` - Foreign key for customers
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.customers.unlink = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::unlink::subscriptionPlan::customers"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.customers#updateById
         * @methodOf lbServices.SubscriptionPlan.customers
         *
         * @description
         *
         * Update a related item by id for customers
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `fk` – `{*}` - Foreign key for customers
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customers.updateById = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::updateById::subscriptionPlan::customers"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.SubscriptionPlan.subscriptions
     * @object
     * @description
     *
     * The object `SubscriptionPlan.subscriptions` groups methods
     * manipulating `Subscription` instances related to `SubscriptionPlan`.
     *
     * Use {@link lbServices.SubscriptionPlan#subscriptions} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan#subscriptions
         * @methodOf lbServices.SubscriptionPlan
         *
         * @description
         *
         * Queries subscriptions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscriptions = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::get::subscriptionPlan::subscriptions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.subscriptions#create
         * @methodOf lbServices.SubscriptionPlan.subscriptions
         *
         * @description
         *
         * Creates a new instance in subscriptions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscriptions.create = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::create::subscriptionPlan::subscriptions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.subscriptions#destroyAll
         * @methodOf lbServices.SubscriptionPlan.subscriptions
         *
         * @description
         *
         * Deletes all subscriptions of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscriptions.destroyAll = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::delete::subscriptionPlan::subscriptions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.subscriptions#destroyById
         * @methodOf lbServices.SubscriptionPlan.subscriptions
         *
         * @description
         *
         * Delete a related item by id for subscriptions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `fk` – `{*}` - Foreign key for subscriptions
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.subscriptions.destroyById = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::destroyById::subscriptionPlan::subscriptions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.subscriptions#findById
         * @methodOf lbServices.SubscriptionPlan.subscriptions
         *
         * @description
         *
         * Find a related item by id for subscriptions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `fk` – `{*}` - Foreign key for subscriptions
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscriptions.findById = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::findById::subscriptionPlan::subscriptions"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.SubscriptionPlan.subscriptions#updateById
         * @methodOf lbServices.SubscriptionPlan.subscriptions
         *
         * @description
         *
         * Update a related item by id for subscriptions
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - subscriptionPlan id
         *
         *  - `fk` – `{*}` - Foreign key for subscriptions
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscription` object.)
         * </em>
         */
        R.subscriptions.updateById = function() {
          var TargetResource = $injector.get("Subscription");
          var action = TargetResource["::updateById::subscriptionPlan::subscriptions"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Swap
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Swap` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Swap",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/swaps/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Swap#create
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/swaps",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Swap#upsert
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/swaps",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Swap#exists
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/swaps/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Swap#findById
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/swaps/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Swap#find
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/swaps",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Swap#findOne
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/swaps/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Swap#deleteById
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/swaps/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Swap#count
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/swaps/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Swap#updateAll
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/swaps/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Swap#prototype$updateAttributes
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - swap id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/swaps/:id",
          method: "PUT",
        },

        // INTERNAL. Use Swap.customer() instead.
        "prototype$__get__customer": {
          url: urlBase + "/swaps/:id/customer",
          method: "GET",
        },

        // INTERNAL. Use Swap.shipment() instead.
        "prototype$__get__shipment": {
          url: urlBase + "/swaps/:id/shipment",
          method: "GET",
        },

        // INTERNAL. Use Swap.oldMachine() instead.
        "prototype$__get__oldMachine": {
          url: urlBase + "/swaps/:id/oldMachine",
          method: "GET",
        },

        // INTERNAL. Use Swap.newMachine() instead.
        "prototype$__get__newMachine": {
          url: urlBase + "/swaps/:id/newMachine",
          method: "GET",
        },

        // INTERNAL. Use Customer.machineSwap.findById() instead.
        "::findById::customer::machineSwap": {
          url: urlBase + "/customers/:id/machineSwap/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.machineSwap.destroyById() instead.
        "::destroyById::customer::machineSwap": {
          url: urlBase + "/customers/:id/machineSwap/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.machineSwap.updateById() instead.
        "::updateById::customer::machineSwap": {
          url: urlBase + "/customers/:id/machineSwap/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.machineSwap() instead.
        "::get::customer::machineSwap": {
          url: urlBase + "/customers/:id/machineSwap",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.machineSwap.create() instead.
        "::create::customer::machineSwap": {
          url: urlBase + "/customers/:id/machineSwap",
          method: "POST",
        },

        // INTERNAL. Use Customer.machineSwap.destroyAll() instead.
        "::delete::customer::machineSwap": {
          url: urlBase + "/customers/:id/machineSwap",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.swaps.findById() instead.
        "::findById::customer::swaps": {
          url: urlBase + "/customers/:id/swaps/:fk",
          method: "GET",
        },

        // INTERNAL. Use Customer.swaps.destroyById() instead.
        "::destroyById::customer::swaps": {
          url: urlBase + "/customers/:id/swaps/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Customer.swaps.updateById() instead.
        "::updateById::customer::swaps": {
          url: urlBase + "/customers/:id/swaps/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Customer.swaps() instead.
        "::get::customer::swaps": {
          url: urlBase + "/customers/:id/swaps",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Customer.swaps.create() instead.
        "::create::customer::swaps": {
          url: urlBase + "/customers/:id/swaps",
          method: "POST",
        },

        // INTERNAL. Use Customer.swaps.destroyAll() instead.
        "::delete::customer::swaps": {
          url: urlBase + "/customers/:id/swaps",
          method: "DELETE",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Swap#updateOrCreate
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Swap` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Swap#destroyById
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Swap#removeById
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Swap#update
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



        /**
         * @ngdoc method
         * @name lbServices.Swap#customer
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Fetches belongsTo relation customer
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - swap id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Customer` object.)
         * </em>
         */
        R.customer = function() {
          var TargetResource = $injector.get("Customer");
          var action = TargetResource["::get::swap::customer"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Swap#shipment
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Fetches belongsTo relation shipment
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - swap id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Shipment` object.)
         * </em>
         */
        R.shipment = function() {
          var TargetResource = $injector.get("Shipment");
          var action = TargetResource["::get::swap::shipment"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Swap#oldMachine
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Fetches belongsTo relation oldMachine
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - swap id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.oldMachine = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::get::swap::oldMachine"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Swap#newMachine
         * @methodOf lbServices.Swap
         *
         * @description
         *
         * Fetches belongsTo relation newMachine
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - swap id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Machine` object.)
         * </em>
         */
        R.newMachine = function() {
          var TargetResource = $injector.get("Machine");
          var action = TargetResource["::get::swap::newMachine"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Vendor
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Vendor` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Vendor",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/vendors/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Vendor#create
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendor` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/vendors",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Vendor#upsert
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendor` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/vendors",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.Vendor#exists
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/vendors/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Vendor#findById
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendor` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/vendors/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Vendor#find
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendor` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/vendors",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.Vendor#findOne
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendor` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/vendors/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Vendor#deleteById
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/vendors/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.Vendor#count
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/vendors/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.Vendor#updateAll
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/vendors/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.Vendor#prototype$updateAttributes
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendor id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendor` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/vendors/:id",
          method: "PUT",
        },

        // INTERNAL. Use Vendor.vendorOrders.findById() instead.
        "prototype$__findById__vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders/:fk",
          method: "GET",
        },

        // INTERNAL. Use Vendor.vendorOrders.destroyById() instead.
        "prototype$__destroyById__vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Vendor.vendorOrders.updateById() instead.
        "prototype$__updateById__vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Vendor.vendorOrders() instead.
        "prototype$__get__vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Vendor.vendorOrders.create() instead.
        "prototype$__create__vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders",
          method: "POST",
        },

        // INTERNAL. Use Vendor.vendorOrders.destroyAll() instead.
        "prototype$__delete__vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders",
          method: "DELETE",
        },

        // INTERNAL. Use VendorOrder.vendor() instead.
        "::get::vendorOrder::vendor": {
          url: urlBase + "/vendorOrders/:id/vendor",
          method: "GET",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Vendor#updateOrCreate
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendor` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Vendor#destroyById
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Vendor#removeById
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Vendor#update
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];


    /**
     * @ngdoc object
     * @name lbServices.Vendor.vendorOrders
     * @object
     * @description
     *
     * The object `Vendor.vendorOrders` groups methods
     * manipulating `VendorOrder` instances related to `Vendor`.
     *
     * Use {@link lbServices.Vendor#vendorOrders} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Vendor#vendorOrders
         * @methodOf lbServices.Vendor
         *
         * @description
         *
         * Queries vendorOrders of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendor id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        R.vendorOrders = function() {
          var TargetResource = $injector.get("VendorOrder");
          var action = TargetResource["::get::vendor::vendorOrders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Vendor.vendorOrders#create
         * @methodOf lbServices.Vendor.vendorOrders
         *
         * @description
         *
         * Creates a new instance in vendorOrders of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendor id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        R.vendorOrders.create = function() {
          var TargetResource = $injector.get("VendorOrder");
          var action = TargetResource["::create::vendor::vendorOrders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Vendor.vendorOrders#destroyAll
         * @methodOf lbServices.Vendor.vendorOrders
         *
         * @description
         *
         * Deletes all vendorOrders of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendor id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        R.vendorOrders.destroyAll = function() {
          var TargetResource = $injector.get("VendorOrder");
          var action = TargetResource["::delete::vendor::vendorOrders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Vendor.vendorOrders#destroyById
         * @methodOf lbServices.Vendor.vendorOrders
         *
         * @description
         *
         * Delete a related item by id for vendorOrders
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendor id
         *
         *  - `fk` – `{*}` - Foreign key for vendorOrders
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.vendorOrders.destroyById = function() {
          var TargetResource = $injector.get("VendorOrder");
          var action = TargetResource["::destroyById::vendor::vendorOrders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Vendor.vendorOrders#findById
         * @methodOf lbServices.Vendor.vendorOrders
         *
         * @description
         *
         * Find a related item by id for vendorOrders
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendor id
         *
         *  - `fk` – `{*}` - Foreign key for vendorOrders
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        R.vendorOrders.findById = function() {
          var TargetResource = $injector.get("VendorOrder");
          var action = TargetResource["::findById::vendor::vendorOrders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Vendor.vendorOrders#updateById
         * @methodOf lbServices.Vendor.vendorOrders
         *
         * @description
         *
         * Update a related item by id for vendorOrders
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendor id
         *
         *  - `fk` – `{*}` - Foreign key for vendorOrders
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        R.vendorOrders.updateById = function() {
          var TargetResource = $injector.get("VendorOrder");
          var action = TargetResource["::updateById::vendor::vendorOrders"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.VendorOrder
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `VendorOrder` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "VendorOrder",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/vendorOrders/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#create
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/vendorOrders",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#upsert
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/vendorOrders",
          method: "PUT",
        },

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#exists
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Check whether a model instance exists in the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/vendorOrders/:id/exists",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#findById
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Find a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/vendorOrders/:id",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#find
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        "find": {
          url: urlBase + "/vendorOrders",
          method: "GET",
          isArray: true,
        },

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#findOne
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, orderBy, offset, and limit
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/vendorOrders/findOne",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#deleteById
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/vendorOrders/:id",
          method: "DELETE",
        },

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#count
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Count instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/vendorOrders/count",
          method: "GET",
        },

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#updateAll
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/vendorOrders/update",
          method: "POST",
        },

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#prototype$updateAttributes
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/vendorOrders/:id",
          method: "PUT",
        },

        // INTERNAL. Use VendorOrder.vendor() instead.
        "prototype$__get__vendor": {
          url: urlBase + "/vendorOrders/:id/vendor",
          method: "GET",
        },

        // INTERNAL. Use VendorOrder.part.findById() instead.
        "prototype$__findById__part": {
          url: urlBase + "/vendorOrders/:id/part/:fk",
          method: "GET",
        },

        // INTERNAL. Use VendorOrder.part.destroyById() instead.
        "prototype$__destroyById__part": {
          url: urlBase + "/vendorOrders/:id/part/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use VendorOrder.part.updateById() instead.
        "prototype$__updateById__part": {
          url: urlBase + "/vendorOrders/:id/part/:fk",
          method: "PUT",
        },

        // INTERNAL. Use VendorOrder.part.link() instead.
        "prototype$__link__part": {
          url: urlBase + "/vendorOrders/:id/part/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use VendorOrder.part.unlink() instead.
        "prototype$__unlink__part": {
          url: urlBase + "/vendorOrders/:id/part/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use VendorOrder.part() instead.
        "prototype$__get__part": {
          url: urlBase + "/vendorOrders/:id/part",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use VendorOrder.part.create() instead.
        "prototype$__create__part": {
          url: urlBase + "/vendorOrders/:id/part",
          method: "POST",
        },

        // INTERNAL. Use VendorOrder.part.destroyAll() instead.
        "prototype$__delete__part": {
          url: urlBase + "/vendorOrders/:id/part",
          method: "DELETE",
        },

        // INTERNAL. Use Part.vendorOrder.findById() instead.
        "::findById::part::vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/:fk",
          method: "GET",
        },

        // INTERNAL. Use Part.vendorOrder.destroyById() instead.
        "::destroyById::part::vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Part.vendorOrder.updateById() instead.
        "::updateById::part::vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Part.vendorOrder.link() instead.
        "::link::part::vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/rel/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Part.vendorOrder.unlink() instead.
        "::unlink::part::vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder/rel/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Part.vendorOrder() instead.
        "::get::part::vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Part.vendorOrder.create() instead.
        "::create::part::vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder",
          method: "POST",
        },

        // INTERNAL. Use Part.vendorOrder.destroyAll() instead.
        "::delete::part::vendorOrder": {
          url: urlBase + "/parts/:id/vendorOrder",
          method: "DELETE",
        },

        // INTERNAL. Use Vendor.vendorOrders.findById() instead.
        "::findById::vendor::vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders/:fk",
          method: "GET",
        },

        // INTERNAL. Use Vendor.vendorOrders.destroyById() instead.
        "::destroyById::vendor::vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders/:fk",
          method: "DELETE",
        },

        // INTERNAL. Use Vendor.vendorOrders.updateById() instead.
        "::updateById::vendor::vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders/:fk",
          method: "PUT",
        },

        // INTERNAL. Use Vendor.vendorOrders() instead.
        "::get::vendor::vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders",
          method: "GET",
          isArray: true,
        },

        // INTERNAL. Use Vendor.vendorOrders.create() instead.
        "::create::vendor::vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders",
          method: "POST",
        },

        // INTERNAL. Use Vendor.vendorOrders.destroyAll() instead.
        "::delete::vendor::vendorOrders": {
          url: urlBase + "/vendors/:id/vendorOrders",
          method: "DELETE",
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#updateOrCreate
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `VendorOrder` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#destroyById
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#removeById
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Delete a model instance by id from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#update
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Update instances of the model matched by where from the data source
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];



        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#vendor
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Fetches belongsTo relation vendor
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Vendor` object.)
         * </em>
         */
        R.vendor = function() {
          var TargetResource = $injector.get("Vendor");
          var action = TargetResource["::get::vendorOrder::vendor"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.VendorOrder.part
     * @object
     * @description
     *
     * The object `VendorOrder.part` groups methods
     * manipulating `Part` instances related to `VendorOrder`.
     *
     * Use {@link lbServices.VendorOrder#part} to query
     * all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.VendorOrder#part
         * @methodOf lbServices.VendorOrder
         *
         * @description
         *
         * Queries part of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {Function(Array.<Object>, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        R.part = function() {
          var TargetResource = $injector.get("Part");
          var action = TargetResource["::get::vendorOrder::part"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder.part#create
         * @methodOf lbServices.VendorOrder.part
         *
         * @description
         *
         * Creates a new instance in part of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        R.part.create = function() {
          var TargetResource = $injector.get("Part");
          var action = TargetResource["::create::vendorOrder::part"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder.part#destroyAll
         * @methodOf lbServices.VendorOrder.part
         *
         * @description
         *
         * Deletes all part of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        R.part.destroyAll = function() {
          var TargetResource = $injector.get("Part");
          var action = TargetResource["::delete::vendorOrder::part"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder.part#destroyById
         * @methodOf lbServices.VendorOrder.part
         *
         * @description
         *
         * Delete a related item by id for part
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         *  - `fk` – `{*}` - Foreign key for part
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.part.destroyById = function() {
          var TargetResource = $injector.get("Part");
          var action = TargetResource["::destroyById::vendorOrder::part"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder.part#findById
         * @methodOf lbServices.VendorOrder.part
         *
         * @description
         *
         * Find a related item by id for part
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         *  - `fk` – `{*}` - Foreign key for part
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        R.part.findById = function() {
          var TargetResource = $injector.get("Part");
          var action = TargetResource["::findById::vendorOrder::part"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder.part#link
         * @methodOf lbServices.VendorOrder.part
         *
         * @description
         *
         * Add a related item by id for part
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         *  - `fk` – `{*}` - Foreign key for part
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        R.part.link = function() {
          var TargetResource = $injector.get("Part");
          var action = TargetResource["::link::vendorOrder::part"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder.part#unlink
         * @methodOf lbServices.VendorOrder.part
         *
         * @description
         *
         * Remove the part relation to an item by id
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         *  - `fk` – `{*}` - Foreign key for part
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        R.part.unlink = function() {
          var TargetResource = $injector.get("Part");
          var action = TargetResource["::unlink::vendorOrder::part"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.VendorOrder.part#updateById
         * @methodOf lbServices.VendorOrder.part
         *
         * @description
         *
         * Update a related item by id for part
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*=}` - vendorOrder id
         *
         *  - `fk` – `{*}` - Foreign key for part
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {Function(Object, Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {Function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @return {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Part` object.)
         * </em>
         */
        R.part.updateById = function() {
          var TargetResource = $injector.get("Part");
          var action = TargetResource["::updateById::vendorOrder::part"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = '$LoopBack$' + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = '$LoopBack$' + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {
          if (LoopBackAuth.accessTokenId) {
            config.headers.authorization = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])
  .factory('LoopBackResource', [ '$resource', function($resource) {
    return function(url, params, actions) {
      var resource = $resource(url, params, actions);

      // Angular always calls POST on $save()
      // This hack is based on
      // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
      resource.prototype.$save = function(success, error) {
        // Fortunately, LoopBack provides a convenient `upsert` method
        // that exactly fits our needs.
        var result = resource.upsert.call(this, {}, this, success, error);
        return result.$promise || result;
      }

      return resource;
    };
  }]);

})(window, window.angular);
