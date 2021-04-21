function get_shortcode(){
	return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
}

module.exports = {
	shortcode: get_shortcode()
}