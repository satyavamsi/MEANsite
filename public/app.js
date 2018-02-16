(function(){
	angular
		.module("BlogApp",[])
		.controller("BlogController",BlogController);

	function BlogController($scope, $http){
		$scope.createPost = createPost;
		$scope.deletePost = deletePost;
		function init(){
			getAllPosts();
		}

		init();

		function deletePost(postid){
			$http
				.delete("/api/blogpost/"+postid)
				.success(getAllPosts);
		}

		function getAllPosts(){
			$http
			.get("/api/blogpost")
			.success(function(posts){
				$scope.posts = posts;
			});
		}

		function createPost(post){
			console.log(post);
			$http
			.post("/api/blogpost",post)
			.success(getAllPosts);
		}
	}
})();