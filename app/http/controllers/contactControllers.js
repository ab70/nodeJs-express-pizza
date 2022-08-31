
function contactControllers(){
	return{
		contact(req,res){
			res.render('contact',{title:'Contact'})
		}
	}
}
module.exports = contactControllers