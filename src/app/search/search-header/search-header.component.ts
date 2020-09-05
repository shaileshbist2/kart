import {Component, OnInit} from '@angular/core';
import {SearchHeaderService} from './search-header.service';
import {Router} from '@angular/router';
import {SessionService} from '../../shared/session.service';
declare var jquery: any;
declare var $: any;
@Component({
    selector: 'app-search-header',
    templateUrl: './search-header.component.html',
    styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit {

    constructor(private router: Router,
                private sessionService: SessionService,
                private service: SearchHeaderService) {
    }


    ngOnInit() {

        //***** Side Menu *****//
        $(".side-menus li.menu-item-has-children > a").on("click", function () {
            $(this).parent().siblings().children("ul").slideUp();
            $(this).parent().siblings().removeClass("active");
            $(this).parent().children("ul").slideToggle();
            $(this).parent().toggleClass("active");
            return false;
        });

        //***** Side Menu Option *****//
        $('.menu-options').on("click", function () {
            $(".side-header.opened-menu").toggleClass('slide-menu');
            $(".main-content").toggleClass('wide-content');
            $(".menu-options").toggleClass('active');
        });

        /*** FIXED Menu APPEARS ON SCROLL DOWN ***/
        $(window).scroll(function () {
            let scroll = $(window).scrollTop();
            if (scroll >= 10) {
                $(".side-header").addClass("sticky");
            }
            else {
                $(".side-header").removeClass("sticky").addClass("");
            }
        });

        $(".side-menus nav > ul > li ul li > a").on("click", function () {
            $(".side-header").removeClass("slide-menu");
            $(".menu-options").removeClass("active");
        });

        //***** Side Menu *****//
        $('.side-menus').slimScroll({
            height: '400px',
            wheelStep: 10,
            size: '2px'
        });
    }

}
