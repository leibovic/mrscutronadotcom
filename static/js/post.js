function addComment(authorId,postId,startId,destId) {
	$.ajax({
		type: "POST",
  		url: "/post/" + postId, 
  		data: { user_id: authorId, post_pk: postId, comment: $(startId).val() }
		}).done(function( msg ) {
			$('#comment_input').val(""); 
			$(destId).append('<div class="page-header"><h4>'+msg['comment_author']+':</h4><p>'+msg['comment_content']+'</p><small>'+msg['comment_timestamp']+'</small></div>');
  		});	
}
$(document).ready(function() {
	$('#comment_input').keyup(function(event) {
		if(event.keyCode == 13) {
			$('#comment_submit').click();
		}
	});
});
function editComment(destId,commentPk) {
	$.ajax({
		type: "GET",
		url: "/edit_comment/" + commentPk
	}).done(function(msg) {
		var first = '<textarea class="form-control" id="edited_comment">'+msg['comment_content']+'</textarea><a href="javascript:submitEdit(\'' + destId + '\',' + commentPk + ');"><button class="btn btn-default" id="edit_submit">Submit</button></a>';
		$(destId).append(first);
	});
}
function submitEdit(startId,commentPk) {
	$.ajax({
		type: "POST",
  		url: "/edit_comment/" + commentPk,
  		data: { edited_comment: $('#edited_comment').val() }
		}).done(function( msg ) {
			$(startId).hide();
			$(startId+"-mom").append(msg['comment_content']);
			$(startId+"-mom").append('<br><br><small>');
			$(startId+"-mom").append(msg['comment_timestamp']);
			$(startId+"-mom").append('<a href="javascript:editComment(#');
			$(startId+"-mom").append(msg['comment_pk']);
			$(startId+"-mom").append(',');
			$(startId+"-mom").append(msg['comment_pk']);
			$(startId+"-mom").append(');">edit</a></small></div>');
  		});	
}
