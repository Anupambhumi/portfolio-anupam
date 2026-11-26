$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        const scrollTop = document.querySelector('#scroll-top');
        if (scrollTop && window.scrollY > 60) {
            scrollTop.classList.add('active');
        } else if (scrollTop) {
            scrollTop.classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (!target.length) return;
        $('html, body').animate({
            scrollTop: target.offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        if (typeof emailjs !== "undefined") {
            emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
            emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    document.getElementById("contact-form").reset();
                    alert("Form Submitted Successfully");
                }, function (error) {
                    console.log('FAILED...', error);
                    alert("Form Submission Failed! Try Again");
                });
        }
        event.preventDefault();
    });

    // <!-- typed js effect starts -->
    if (document.querySelector(".typing-text") && typeof Typed !== "undefined") {
        new Typed(".typing-text", {
            strings: ["frontend development", "backend development", "web designing", "android development", "web development"],
            loop: true,
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 500,
        });
    }
    // <!-- typed js effect ends -->

    // <!-- tilt js effect starts -->
    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
    }
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    if (typeof ScrollReveal !== "undefined") {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });

        /* SCROLL HOME */
        srtop.reveal('.home .content h3', { delay: 200 });
        srtop.reveal('.home .content p', { delay: 200 });
        srtop.reveal('.home .content .btn', { delay: 200 });

        srtop.reveal('.home .image', { delay: 400 });
        srtop.reveal('.home .linkedin', { interval: 600 });
        srtop.reveal('.home .github', { interval: 800 });
        srtop.reveal('.home .twitter', { interval: 1000 });
        srtop.reveal('.home .telegram', { interval: 600 });
        srtop.reveal('.home .instagram', { interval: 600 });
        srtop.reveal('.home .dev', { interval: 600 });

        /* SCROLL ABOUT */
        srtop.reveal('.about .content h3', { delay: 200 });
        srtop.reveal('.about .content .tag', { delay: 200 });
        srtop.reveal('.about .content p', { delay: 200 });
        srtop.reveal('.about .content .box-container', { delay: 200 });
        srtop.reveal('.about .content .resumebtn', { delay: 200 });

        /* SCROLL EDUCATION */
        srtop.reveal('.education .box', { interval: 200 });

        /* SCROLL EXPERIENCE */
        srtop.reveal('.experience .timeline', { delay: 400 });
        srtop.reveal('.experience .timeline .container', { interval: 400 });

        /* SCROLL CONTACT */
        srtop.reveal('.contact .container', { delay: 400 });
        srtop.reveal('.contact .container .form-group', { delay: 400 });

        // Expose srtop to be used in showSkills and showProjects
        window.srtop = srtop;
    }

    // Fetch and display skills and projects
    fetchData().then(data => {
        showSkills(data);
    }).catch(error => console.error(error));

    fetchData("projects").then(data => {
        showProjects(data);
    }).catch(error => console.error(error));

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Anupam";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("/skills.json")
        :
        response = await fetch("/projects/projects.json")
    if (!response.ok) {
        throw new Error(`Failed to load ${type}: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;

    if (window.srtop) {
        window.srtop.reveal('.skills .container', { interval: 200 });
        window.srtop.reveal('.skills .container .bar', { delay: 400 });
    }
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#Projects .box-container");
    if (!projectsContainer) return;

    const escapeHtml = (str) => String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    let projectHTML = "";
    projects.forEach((project, idx) => {
        const idLabel = project.id || `P.0${idx + 1}`;
        const categoryLabel = project.categoryLabel || (project.category ? project.category.toUpperCase() : "PROJECT");
        const orgLabel = project.orgLabel || "PORTFOLIO";
        const impactItems = Array.isArray(project.impact)
            ? project.impact.map(item => `<li>${escapeHtml(item)}</li>`).join("")
            : "";
        const stackItems = Array.isArray(project.stack)
            ? project.stack.map(tech => `<span class="ps-stack-pill">${escapeHtml(tech)}</span>`).join("")
            : "";

        const demo = project.demo || {};
        const tabs = Array.isArray(demo.tabs) && demo.tabs.length > 0 ? demo.tabs : [
            {
                label: "Overview",
                badge: project.links && project.links.view ? "LIVE PROJECT" : "PROJECT PREVIEW",
                title: project.name,
                description: project.desc,
                tags: Array.isArray(project.stack) ? project.stack.slice(0, 3) : []
            }
        ];
        const firstTab = tabs[0];
        const tabsHtml = tabs.map((tab, tIdx) => `
            <button type="button" class="ps-demo-tab${tIdx === 0 ? " is-active" : ""}" data-project-idx="${idx}" data-tab-idx="${tIdx}">
                ${escapeHtml(tab.label)}
            </button>
        `).join("");
        const firstTagsHtml = (firstTab.tags || []).map(tag => `<span class="ps-demo-tag">${escapeHtml(tag)}</span>`).join("");

        const viewUrl = project.links && project.links.view ? project.links.view : "";
        const codeUrl = project.links && project.links.code ? project.links.code : "";
        const visitText = project.visitLabel || "Visit Project";

        projectHTML += `
        <article class="project-showcase" data-project-idx="${idx}">
            <div class="ps-left">
                <div class="ps-meta">
                    <span>${escapeHtml(categoryLabel)}</span>
                    <span>${escapeHtml(orgLabel)}</span>
                </div>
                <h3 class="ps-title">${escapeHtml(project.name)}</h3>
                <p class="ps-lead">${escapeHtml(project.desc)}</p>

                ${project.problem ? `
                <div class="ps-block">
                    <span class="ps-label">THE PROBLEM</span>
                    <p class="ps-text">${escapeHtml(project.problem)}</p>
                </div>` : ""}

                ${project.audience ? `
                <div class="ps-block">
                    <span class="ps-label">WHO USES IT</span>
                    <p class="ps-text">${escapeHtml(project.audience)}</p>
                </div>` : ""}

                ${impactItems ? `
                <div class="ps-block">
                    <span class="ps-label">RESULT &amp; IMPACT</span>
                    <ul class="ps-impact">${impactItems}</ul>
                </div>` : ""}

                ${(stackItems || project.architecture) ? `
                <div class="ps-accordion">
                    <button type="button" class="ps-accordion-btn" aria-expanded="false">
                        <span class="ps-accordion-btn-left">
                            <span>&lt;/&gt; <strong>For developers</strong></span>
                            <span class="ps-accordion-sub">&middot; STACK &amp; ARCHITECTURE</span>
                        </span>
                        <i class="fas fa-chevron-down ps-accordion-icon"></i>
                    </button>
                    <div class="ps-accordion-body">
                        ${project.architecture ? `<p class="ps-arch-text">${escapeHtml(project.architecture)}</p>` : ""}
                        ${stackItems ? `<div class="ps-stack-list">${stackItems}</div>` : ""}
                    </div>
                </div>` : ""}

                <div class="ps-actions">
                    ${viewUrl && viewUrl !== "#" ? `
                    <a href="${escapeHtml(viewUrl)}" class="ps-btn-primary" target="_blank" rel="noopener noreferrer">
                        ${escapeHtml(visitText)} <span aria-hidden="true">&#8599;</span>
                    </a>` : ""}
                    ${codeUrl && codeUrl !== "#" && codeUrl !== viewUrl ? `
                    <a href="${escapeHtml(codeUrl)}" class="ps-btn-secondary" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-code"></i> Source Code
                    </a>` : ""}
                </div>
            </div>

            <div class="ps-right">
                <div class="ps-demo-top">
                    <span class="ps-demo-id">${escapeHtml(idLabel)} &middot; INTERACTIVE DEMO</span>
                    <span class="ps-live-badge"><span class="ps-live-dot"></span> ${escapeHtml(demo.footerRight || "Live")}</span>
                </div>

                <div class="ps-demo-frame">
                    <div class="ps-demo-header">
                        <span class="ps-demo-header-title">${escapeHtml(demo.headerTitle || project.name)}</span>
                        <div class="ps-demo-tabs">${tabsHtml}</div>
                    </div>

                    <div class="ps-demo-body">
                        <div class="ps-demo-card">
                            <div class="ps-demo-badge">${escapeHtml(firstTab.badge || "")}</div>
                            <h4 class="ps-demo-card-title">${escapeHtml(firstTab.title || "")}</h4>
                            <p class="ps-demo-card-desc">${escapeHtml(firstTab.description || "")}</p>
                            <div class="ps-demo-tags">${firstTagsHtml}</div>
                        </div>
                    </div>

                    <div class="ps-demo-footer">
                        <span>${escapeHtml(demo.footerLeft || project.name)}</span>
                        <span class="ps-demo-footer-status"><span class="ps-live-dot"></span> ${escapeHtml(demo.footerRight || "Live")}</span>
                    </div>
                </div>
            </div>
        </article>`;
    });

    projectsContainer.innerHTML = projectHTML;

    projectsContainer.onclick = (e) => {
        const accBtn = e.target.closest(".ps-accordion-btn");
        if (accBtn) {
            const acc = accBtn.closest(".ps-accordion");
            const isOpen = acc.classList.toggle("is-open");
            accBtn.setAttribute("aria-expanded", String(isOpen));
            return;
        }

        const tabBtn = e.target.closest(".ps-demo-tab");
        if (tabBtn) {
            const pIdx = Number(tabBtn.getAttribute("data-project-idx"));
            const tIdx = Number(tabBtn.getAttribute("data-tab-idx"));
            const project = projects[pIdx];
            if (!project || !project.demo || !project.demo.tabs || !project.demo.tabs[tIdx]) return;

            const card = tabBtn.closest(".project-showcase");
            card.querySelectorAll(".ps-demo-tab").forEach(btn => btn.classList.remove("is-active"));
            tabBtn.classList.add("is-active");

            const tab = project.demo.tabs[tIdx];
            const demoCard = card.querySelector(".ps-demo-card");
            demoCard.querySelector(".ps-demo-badge").textContent = tab.badge || "";
            demoCard.querySelector(".ps-demo-card-title").textContent = tab.title || "";
            demoCard.querySelector(".ps-demo-card-desc").textContent = tab.description || "";
            demoCard.querySelector(".ps-demo-tags").innerHTML = (tab.tags || [])
                .map(tag => `<span class="ps-demo-tag">${escapeHtml(tag)}</span>`)
                .join("");
        }
    };

    if (window.srtop) {
        window.srtop.reveal('.Projects .project-showcase', { interval: 150 });
    }
}

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

