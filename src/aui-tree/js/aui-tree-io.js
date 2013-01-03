var Lang = A.Lang,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	EVENT_IO_REQUEST_SUCCESS = 'ioRequestSuccess',

	CONTENT_BOX = 'contentBox',
	IO = 'io',
	OWNER_TREE = 'ownerTree',
	LOADED = 'loaded',
	LOADING = 'loading',
	NODE = 'node',
	TREE = 'tree',

	getCN = A.ClassNameManager.getClassName,

	CSS_TREE_NODE_IO_LOADING = getCN(TREE, NODE, IO, LOADING);

function TreeViewIO(config) {
	var instance = this;

	instance.publish(
		EVENT_IO_REQUEST_SUCCESS,
		{
			defaultFn: instance._onIOSuccessDefault
		}
	);
}


TreeViewIO.ATTRS = {
	/**
	 * IO options for the current TreeNode load the children.
	 *
	 * @attribute io
	 * @default Default IO Configuration.
	 * @type Object
	 */
	io: {
		lazyAdd: false,
		value: null,
		setter: function(v) {
			return this._setIO(v);
		}
	}
};

TreeViewIO.prototype = {
	initializer: function() {
		var instance = this;

		instance.publish(

		);
	},

	/**
	 * Initialize the IO transaction setup on the <a
	 * href="TreeNode.html#config_io">io</a> attribute.
	 *
	 * @method initIO
	 */
	initIO: function() {
		var instance = this;

		var io = instance.get(IO);

		if (isFunction(io.cfg.data)) {
			io.cfg.data = io.cfg.data.call(instance, instance);
		}

		instance._syncPaginatorIOData(io);

		if (isFunction(io.loader)) {
			var loader = A.bind(io.loader, instance);

			// apply loader in the TreeNodeIO scope
			loader(io.url, io.cfg, instance);
		}
		else {
			A.io.request(io.url, io.cfg);
		}
	},

	/**
	 * IO Start handler.
	 *
	 * @method ioStartHandler
	 */
	ioStartHandler: function() {
		var instance = this;

		var contentBox = instance.get(CONTENT_BOX);

		instance.set(LOADING, true);

		contentBox.addClass(CSS_TREE_NODE_IO_LOADING);
	},

	/**
	 * IO Complete handler.
	 *
	 * @method ioCompleteHandler
	 */
	ioCompleteHandler: function() {
		var instance = this;

		var contentBox = instance.get(CONTENT_BOX);

		instance.set(LOADING, false);
		instance.set(LOADED, true);

		contentBox.removeClass(CSS_TREE_NODE_IO_LOADING);
	},

	/**
	 * IO Success handler.
	 *
	 * @method ioSuccessHandler
	 */
	ioSuccessHandler: function() {
		var instance = this;

		var io = instance.get(IO);

		var args = Array.prototype.slice.call(arguments);
		var length = args.length;

		// if using the first argument as the JSON object
		var nodes = args[1];

		// if using (event, id, o) yui callback syntax
		if (length >= 3) {
			var o = args[2];
			// try to convert responseText to JSON
			try {
				nodes = A.JSON.parse(o.responseText);
			}
			catch(e) {}
		}

		var formatter = io.formatter;

		if (formatter) {
			nodes = formatter(nodes);
		}

		instance.createNodes(nodes);

		instance.fire(EVENT_IO_REQUEST_SUCCESS, nodes);
	},

	/**
	 * IO Failure handler.
	 *
	 * @method ioFailureHandler
	 */
	ioFailureHandler: function() {
		var instance = this;

		instance.fire('ioRequestFailure');

		instance.set(LOADING, false);
		instance.set(LOADED, false);
	},

	_onIOSuccessDefault: function(event) {
		var instance = this;

		var ownerTree = instance.get(OWNER_TREE);

		if (ownerTree && ownerTree.ddDelegate) {
			ownerTree.ddDelegate.syncTargets();
		}
	},

	/**
	 * Setter for <a href="TreeNodeIO.html#config_io">io</a>.
	 *
	 * @method _setIO
	 * @protected
	 * @param {Object} v
	 * @return {Object}
	 */
	_setIO: function(v) {
		var instance = this;

		if (!v) {
			return null;
		}
		else if (isString(v)) {
			v = { url: v };
		}

		v = v || {};
		v.cfg = v.cfg || {};
		v.cfg.on = v.cfg.on || {};

		var defCallbacks = {
			start: A.bind(instance.ioStartHandler, instance),
			complete: A.bind(instance.ioCompleteHandler, instance),
			success: A.bind(instance.ioSuccessHandler, instance),
			failure: A.bind(instance.ioFailureHandler, instance)
		};

		A.each(defCallbacks, function(fn, name) {
			var userFn = v.cfg.on[name];

			if (isFunction(userFn)) {
				// wrapping user callback and default callback, invoking both handlers
				var wrappedFn = function() {
					fn.apply(instance, arguments);
					userFn.apply(instance, arguments);
				};

				v.cfg.on[name] = A.bind(wrappedFn, instance);
			}
			else {
				// get from defCallbacks map
				v.cfg.on[name] = fn;
			}

		});

		return v;
	}
};

A.TreeViewIO = TreeViewIO;