/*! popovers-users.js | Friendkit | © Css Ninja. 2019-2020 */

/* ==========================================================================
Handles the user popovers that appear when hovering a user image
========================================================================== */

"use strict";
var users = [];
function getUserPopovers() {
    $('*[data-user-popover]').mouseenter(function () {
        var e = $(this);
        var userRef = $(this).attr('data-user-popover');

        var messageIcon = feather.icons['message-circle'].toSvg();
        var profileIcon = feather.icons['more-horizontal'].toSvg();
        var pinIcon = feather.icons['map-pin'].toSvg();
        var usersIcon = feather.icons.users.toSvg();
        var bookmarkIcon = feather.icons.bookmark.toSvg();

        let userLocal =  _.filter(users, function(o) {
            return o.id === userRef || o === userRef;
        });
        console.log('include', userLocal);
        if(userLocal.length === 0){
            $.ajax({
                url: 'https://help.wolfix.ro/api/users/list_user?id='+userRef,
                async: true,
                dataType: 'json',
                success: function (data) {

                    users.push(data);
                    console.log(data);
                    setTimeout(function () {
                        e.webuiPopover({
                            trigger: 'hover',
                            placement: 'auto',
                            width: 300,
                            padding: false,
                            offsetLeft: 0,
                            offsetTop: 20,
                            animation: 'pop',
                            cache: false,
                            content: function () {

                                var destroyLoader = setTimeout(function () {
                                    $('.loader-overlay').removeClass('is-active');
                                }, 300);

                                var html = `
                                    <div class="profile-popover-block">
    
                                        <div class="loader-overlay is-active">
                                            <div class="loader is-loading"></div>
                                        </div>
    
                                        <div class="profile-popover-wrapper">
                                            <div class="popover-cover">
                                                <img src="${data.profile_pic}">
                                                <div class="popover-avatar">
                                                    <img class="avatar" src="${data.profile_pic}">
                                                </div>
                                            </div>
    
                                            <div class="popover-meta">
                                                <span class="user-meta">
                                                    <span class="username">${data.first_name} ${data.last_name}</span>
                                                </span>
                                                <!--span class="job-title">${data.title}</span-->
                                                <div class="common-friends">
                                                    ${usersIcon}
                                                    <div class="text">
                                                        ${data.common_friends} mutual friend(s)
                                                    </div>
                                                </div>
                                                <div class="user-location">
                                                    ${pinIcon}
                                                    <div class="text">
                                                        From <a href="#">${data.location}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="popover-actions">
    
                                            <a href="#" class="popover-icon">
                                                ${profileIcon}
                                            </a>
                                            <a href="#" class="popover-icon">
                                                ${bookmarkIcon}
                                            </a>
                                            <a href="#" class="popover-icon">
                                                ${messageIcon}
                                            </a>
                                        </div>
                                    </div>
                                `;

                                return html;
                                return destroyLoader;

                            }
                        });
                        e.webuiPopover('show');
                    }, 500);
                },
                error: function (data) {
                    console.log(data.responseJSON.mesaj);
                    users.push(userRef);
                    console.log(users);
                }

            });
        } else{
            setTimeout(function () {
                var html = `
                                    <div class="profile-popover-block">
    
                                        <div class="loader-overlay is-active">
                                            <div class="loader is-loading"></div>
                                        </div>
    
                                        <div class="profile-popover-wrapper">
                                            <div class="popover-cover">
                                                <img src="${userLocal[0].profile_pic}">
                                                <div class="popover-avatar">
                                                    <img class="avatar" src="${userLocal[0].profile_pic}">
                                                </div>
                                            </div>
    
                                            <div class="popover-meta">
                                                <span class="user-meta">
                                                    <span class="username">${userLocal[0].first_name} ${userLocal[0].last_name}</span>
                                                </span>
                                                <!--span class="job-title">${userLocal[0].title}</span-->
                                                <div class="common-friends">
                                                    ${usersIcon}
                                                    <div class="text">
                                                        ${userLocal[0].common_friends} mutual friend(s)
                                                    </div>
                                                </div>
                                                <div class="user-location">
                                                    ${pinIcon}
                                                    <div class="text">
                                                        From <a href="#">${userLocal[0].location}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="popover-actions">
    
                                            <a href="#" class="popover-icon">
                                                ${profileIcon}
                                            </a>
                                            <a href="#" class="popover-icon">
                                                ${bookmarkIcon}
                                            </a>
                                            <a href="#" class="popover-icon">
                                                ${messageIcon}
                                            </a>
                                        </div>
                                    </div>
                                `;
            }, 500);
        }

    });
}

$(document).ready(function () {

    /* Users

        0. Jenna Davis
        1. Dan Walker
        2. Stella Bergmann
        3. Daniel Wellington
        4. David Kim
        5. Edward Mayers
        6. Elise Walker
        7. Milly Augustine
        8. Bobby Brown
        9. Nelly Schwartz
        10. Lana Henrikssen
        11. Gaelle Morris
        12. Mike Lasalle
        13. Rolf Krupp
        14. Ken Rogers
        15. Leana Marks
        16. Aline Cambell
        17. Mike Donovan
        18. George A. Romero
        19. Brian Stevenson
        20. Azzouz El Paytoun
        21. Cathy Smith
        22. Bob Barker
        23. Greg Patel
        24. Hisashi Yokida
    */

    getUserPopovers();

})