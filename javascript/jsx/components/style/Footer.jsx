import React from "react";

import { GridRow } from "components/Layout.jsx";

export class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <footer className="footer">Footer</footer>

        );
    }
}


/**footer.footer
    .row.wow.fadeInUp
        .col-sm-2.col-xs-6
            span.footer-header About Us
            ul.footer-link-list
                li
                    a href="/" Home
                li
                    a href="/pricing" Pricing
                li
                    a href="/about" Who Are We?
                li
                    a href="http://dubblejump.tumblr.com" Blog
        .col-sm-2.col-xs-6
            span.footer-header Members
            ul.footer-link-list
                li
                    a href="/register" Become a Member
                li
                    a href="/login" Login
                li
                    a href="/users/you" View your Profile
        .col-sm-2.col-xs-6
            span.footer-header Learn
            ul.footer-link-list
                li
                    a href="/learn" Browse Courses
                li
                    a href="/definitions" Definitions
        .col-sm-2.col-xs-6
            span.footer-header Admin
            ul.footer-link-list
                li
                    a href="/privacy" Privacy Policy
                li
                    a href="/terms" Terms of Use
        .col-sm-4.col-xs-12
            span.footer-header Yo
            p
                | We love video games, we love making them even more and we want to share that passion with all of you!
    a.float-right href="https://mixpanel.com/f/partner"
        img src="//cdn.mxpnl.com/site_media/images/partner/badge_blue.png" alt="Mobile Analytics"
    .doublejump-dark
        a.make-games-badge href="http://voltic.com.au"
    p.text-center
        | Made for <strong>fun</strong> in <strong>Brisbane, Australia</strong>
**/
