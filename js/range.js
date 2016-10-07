(function() {

	RangeSerializer = {

		childNodeIndexOf: function (parentNode, childNode) {
			var childNodes = parentNode.childNodes;
			for (var i = 0, l = childNodes.length; i < l; i++) {
				if (childNodes[i] === childNode) { return i; }
			}
		},

		computedNthIndex: function (childElement) {
			var childNodes = childElement.parentNode.childNodes,
				tagName = childElement.tagName,
				elementsWithSameTag = 0;

			for (var i = 0, l = childNodes.length; i < l; i++) {
				if (childNodes[i] === childElement) { return elementsWithSameTag + 1; }
				if (childNodes[i].tagName === tagName) { elementsWithSameTag++; }
			}
		},
		generate: function (node) {
			var textNodeIndex = this.childNodeIndexOf(node.parentNode, node),
				currentNode = node,
				tagNames = [];

			while (currentNode) {
				var tagName = currentNode.tagName;

				if (tagName) {
					var nthIndex = this.computedNthIndex(currentNode);
					var selector = tagName;

					if (nthIndex > 1) {
						selector += ":nth-of-type(" + nthIndex + ")";
					}

					tagNames.push(selector);
				}

				currentNode = currentNode.parentNode;
			}

			return {selector: tagNames.reverse().join(" > ").toLowerCase(), childNodeIndex: textNodeIndex};
		},
		find: function (result) {
			var element = document.querySelector(result.selector);
			if (!element) { throw new Error('Unable to find element with selector: ' + result.selector); }
			return element.childNodes[result.childNodeIndex];
		},
		serialize: function (range) {
			var start = this.generate(range.startContainer);
			start.offset = range.startOffset;
			var end = this.generate(range.endContainer);
			end.offset = range.endOffset;

			return {start: start, end: end};
		},

		deserialize: function (result) {
			var range = document.createRange(),
			    startNode = find(result.start),
			    endNode = find(result.end);

			range.setStart(startNode, result.start.offset);
			range.setEnd(endNode, result.end.offset);

			return range;
		}
	}
})();
