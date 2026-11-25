// =====================================================
// AFDHOL COFFEE SHOP - SCRIPT.JS (versi lengkap sampai Tahap 11)
// =====================================================


// =====================================================
// DATA PRODUK
// PENTING: semua data di bawah ini adalah CONTOH.
// Ganti nama, berat, harga, dan karakter rasa dengan data asli Afdhol.
// =====================================================

// Nomor WhatsApp Afdhol: awali dengan 62 (tanpa 0, tanpa tanda +)
// Contoh: 0812-3456-7890 ditulis "6281586756359"
var AFDHOL_WA_NUMBER = "6281586756359";

var khaikal_products = [
    {
        id: "house-blend",
        name: "Afdhol House Blend",
        category: "kemasan",
        type: "Blend",
        weight: "200 g",
        price: 65000,
        image: "house_blend.jpg",
        taste: "Cokelat, karamel, body seimbang",
        desc: "Perpaduan biji pilihan untuk seduhan harian yang seimbang dan mudah dinikmati."
    },
    {
        id: "arabica-bubuk",
        name: "Arabica Kopi Bubuk",
        category: "kemasan",
        type: "Arabica",
        weight: "100 g",
        price: 45000,
        image: "arabica_bubuk.jpg",
        taste: "Fruity, asam lembut, aroma floral",
        desc: "Kopi arabica bubuk siap seduh, cocok untuk manual brew maupun french press."
    },
    {
        id: "drip-bag",
        name: "Afdhol Drip Bag",
        category: "kemasan",
        type: "Arabica",
        weight: "10 sachet",
        price: 55000,
        image: "drip_bag.jpg",
        taste: "Ringan, manis, bersih",
        desc: "Praktis diseduh di mana saja, cukup tuang air panas langsung ke kemasan."
    },
    {
        id: "arabica-biji",
        name: "Arabica Biji Kopi",
        category: "biji",
        type: "Arabica",
        weight: "250 g",
        price: 95000,
        image: "arabica_biji.jpg",
        taste: "Fruity, floral, keasaman cerah",
        desc: "Biji kopi arabica pilihan untuk digiling dan diseduh sendiri di rumah."
    },
    {
        id: "robusta-biji",
        name: "Robusta Biji Kopi",
        category: "biji",
        type: "Robusta",
        weight: "250 g",
        price: 70000,
        image: "robusta_biji.jpg",
        taste: "Pahit pekat, earthy, crema tebal",
        desc: "Biji kopi robusta dengan body tebal, cocok untuk espresso dan kopi susu."
    },
    {
        id: "blend-biji",
        name: "Afdhol Blend Biji Kopi",
        category: "biji",
        type: "Blend",
        weight: "500 g",
        price: 150000,
        image: "blend_biji.jpg",
        taste: "Cokelat, kacang, body tebal",
        desc: "Campuran arabica dan robusta dalam kemasan besar untuk stok di rumah atau kantor."
    }
];


// =====================================================
// FUNGSI BANTU (dipakai juga di halaman Product Detail nanti)
// =====================================================

function afdholFormatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function afdholCategoryLabel(category) {
    return category === "biji" ? "Biji Kopi" : "Kopi Kemasan";
}

function afdholWaLink(product) {
    var pesan = "Halo Afdhol, saya ingin memesan " + product.name +
                " (" + product.weight + "). Apakah masih tersedia?";
    return "https://wa.me/" + AFDHOL_WA_NUMBER + "?text=" + encodeURIComponent(pesan);
}


// =====================================================
// MEMBUAT KARTU PRODUK DI HALAMAN COFFEE STORE
// =====================================================

function afdholRenderStore() {
    var grid = document.getElementById("khaikal_product_grid");
    if (!grid) return;

    var html = "";

    khaikal_products.forEach(function (p) {
        var tags = p.category + " " + p.type.toLowerCase();
        var detailUrl = "product.html?id=" + p.id;

        html += '<article class="khaikal_product_card khaikal_reveal" data-tags="' + tags + '">';
        html += '  <a href="' + detailUrl + '" class="khaikal_product_media">';
        html += '    <span class="khaikal_product_placeholder"><img src="assets/images/logo.png" alt=""></span>';
        html += '    <img class="khaikal_product_photo" src="assets/images/produk/' + p.image + '" alt="' + p.name + '" loading="lazy" onerror="this.remove()">';
        html += '    <span class="khaikal_product_badge">' + p.type + '</span>';
        html += '  </a>';
        html += '  <div class="khaikal_product_info">';
        html += '    <p class="khaikal_product_cat">' + afdholCategoryLabel(p.category) + '</p>';
        html += '    <h3 class="khaikal_product_name"><a href="' + detailUrl + '">' + p.name + '</a></h3>';
        html += '    <p class="khaikal_product_meta">' + p.weight + '</p>';
        html += '    <p class="khaikal_product_price">' + afdholFormatRupiah(p.price) + '</p>';
        html += '    <div class="khaikal_product_actions">';
        html += '      <a href="' + detailUrl + '" class="khaikal_btn_small khaikal_btn_small_line">Detail</a>';
        html += '      <a href="' + afdholWaLink(p) + '" class="khaikal_btn_small khaikal_btn_small_fill" target="_blank" rel="noopener">Beli</a>';
        html += '    </div>';
        html += '  </div>';
        html += '</article>';
    });

    grid.innerHTML = html;
}


// =====================================================
// FITUR HALAMAN (berjalan setelah halaman selesai dimuat)
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // ---------- 0. BUAT KARTU PRODUK (khusus halaman store) ----------
    afdholRenderStore();

    // ---------- 1. HAMBURGER MENU ----------
    var hamburger = document.getElementById("khaikal_hamburger");
    var navMenu = document.getElementById("khaikal_nav_menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
            var isOpen = navMenu.classList.toggle("khaikal_open");
            hamburger.classList.toggle("khaikal_open");
            hamburger.setAttribute("aria-expanded", isOpen);
        });

        // Tutup menu saat salah satu link diklik
        var navLinks = navMenu.querySelectorAll("a");
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("khaikal_open");
                hamburger.classList.remove("khaikal_open");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ---------- 2. NAVBAR BERUBAH SAAT SCROLL ----------
    var header = document.getElementById("khaikal_header");

    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 60) {
            header.classList.add("khaikal_scrolled");
        } else {
            header.classList.remove("khaikal_scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();

    // ---------- 3. ANIMASI MUNCUL SAAT SCROLL ----------
    var revealElements = document.querySelectorAll(".khaikal_reveal");

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.classList.add("khaikal_visible");
                    }, index * 120);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Browser lama: langsung tampilkan semua
        revealElements.forEach(function (el) {
            el.classList.add("khaikal_visible");
        });
    }

    // ---------- 4. FILTER KATEGORI HALAMAN COFFEE MENU ----------
    var filterBars = document.querySelectorAll(".khaikal_filter_bar");

    filterBars.forEach(function (bar) {
        var buttons = bar.querySelectorAll(".khaikal_filter_btn");
        var items = document.querySelectorAll(".khaikal_filter_item");

        buttons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var filter = btn.getAttribute("data-filter");

                buttons.forEach(function (b) {
                    b.classList.remove("khaikal_filter_active");
                });
                btn.classList.add("khaikal_filter_active");

                items.forEach(function (item) {
                    var category = item.getAttribute("data-category");
                    if (filter === "all" || category === filter) {
                        item.classList.remove("khaikal_hidden");
                    } else {
                        item.classList.add("khaikal_hidden");
                    }
                });
            });
        });
    });

    // ---------- 5. FILTER PRODUK HALAMAN COFFEE STORE ----------
    var storeBar = document.getElementById("khaikal_store_filter");
    var storeGrid = document.getElementById("khaikal_product_grid");
    var storeCount = document.getElementById("khaikal_product_count");

    if (storeBar && storeGrid) {
        var storeButtons = storeBar.querySelectorAll(".khaikal_filter_btn");

        var applyStoreFilter = function (filter) {
            var cards = storeGrid.querySelectorAll(".khaikal_product_card");
            var shown = 0;

            cards.forEach(function (card) {
                var tags = card.getAttribute("data-tags").split(" ");
                if (filter === "all" || tags.indexOf(filter) !== -1) {
                    card.classList.remove("khaikal_hidden");
                    shown++;
                } else {
                    card.classList.add("khaikal_hidden");
                }
            });

            if (storeCount) {
                storeCount.textContent = "Menampilkan " + shown + " produk";
            }
        };

        storeButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                storeButtons.forEach(function (b) {
                    b.classList.remove("khaikal_filter_active");
                });
                btn.classList.add("khaikal_filter_active");
                applyStoreFilter(btn.getAttribute("data-filter"));
            });
        });

        applyStoreFilter("all");
    }
});
// =====================================================
// TAHAP 9: TAUTAN WHATSAPP OTOMATIS (tempel di paling bawah)
// Setiap link dengan class khaikal_wa_link memakai nomor
// AFDHOL_WA_NUMBER dan teks dari atribut data-wa
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    var waLinks = document.querySelectorAll(".khaikal_wa_link");

    waLinks.forEach(function (el) {
        var text = el.getAttribute("data-wa") || "";
        el.setAttribute("href", "https://wa.me/" + AFDHOL_WA_NUMBER + "?text=" + encodeURIComponent(text));
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
    });
});
// =====================================================
// TAHAP 10: LIGHTBOX GALERI (tempel di paling bawah)
// Filter kategori memakai kode Tahap 6 yang sudah ada
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    var lightbox = document.getElementById("khaikal_lightbox");
    if (!lightbox) return;

    var imgEl = document.getElementById("khaikal_lightbox_img");
    var textEl = document.getElementById("khaikal_lightbox_text");
    var countEl = document.getElementById("khaikal_lightbox_count");
    var btnClose = document.getElementById("khaikal_lightbox_close");
    var btnPrev = document.getElementById("khaikal_lightbox_prev");
    var btnNext = document.getElementById("khaikal_lightbox_next");

    var current = 0;
    var list = [];

    // Ambil hanya foto yang sedang tampil (sesuai filter)
    function getVisibleButtons() {
        var all = document.querySelectorAll(".khaikal_gallery_btn");
        return Array.prototype.filter.call(all, function (btn) {
            return !btn.closest(".khaikal_hidden");
        });
    }

    function showImage(index) {
        if (list.length === 0) return;
        if (index < 0) index = list.length - 1;
        if (index >= list.length) index = 0;
        current = index;

        var btn = list[current];
        imgEl.setAttribute("src", btn.getAttribute("data-src"));
        imgEl.setAttribute("alt", btn.getAttribute("data-caption") || "");
        textEl.textContent = btn.getAttribute("data-caption") || "";
        countEl.textContent = (current + 1) + " / " + list.length;
    }

    function openLightbox(btn) {
        list = getVisibleButtons();
        showImage(list.indexOf(btn));
        lightbox.classList.add("khaikal_lightbox_open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("khaikal_no_scroll");
    }

    function closeLightbox() {
        lightbox.classList.remove("khaikal_lightbox_open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("khaikal_no_scroll");
        imgEl.setAttribute("src", "");
    }

    // Klik foto di galeri
    document.querySelectorAll(".khaikal_gallery_btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            openLightbox(btn);
        });
    });

    btnClose.addEventListener("click", closeLightbox);
    btnPrev.addEventListener("click", function () { showImage(current - 1); });
    btnNext.addEventListener("click", function () { showImage(current + 1); });

    // Klik area gelap di luar foto untuk menutup
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard: Esc menutup, panah kiri/kanan berpindah foto
    document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("khaikal_lightbox_open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showImage(current - 1);
        if (e.key === "ArrowRight") showImage(current + 1);
    });

    // Geser (swipe) di layar sentuh
    var touchStartX = 0;
    lightbox.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (e) {
        var diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                showImage(current - 1);
            } else {
                showImage(current + 1);
            }
        }
    }, { passive: true });
});

// =====================================================
// TAHAP 8: HALAMAN PRODUCT DETAIL
// Memakai data khaikal_products dan fungsi bantu di atas
// =====================================================

function afdholGetProductFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    for (var i = 0; i < khaikal_products.length; i++) {
        if (khaikal_products[i].id === id) {
            return khaikal_products[i];
        }
    }
    return null;
}

function afdholWaLinkQty(product, qty) {
    var total = product.price * qty;
    var pesan = "Halo Afdhol, saya ingin memesan " + product.name +
                " (" + product.weight + ") sebanyak " + qty + " pcs. " +
                "Total " + afdholFormatRupiah(total) + ". Apakah masih tersedia?";
    return "https://wa.me/" + AFDHOL_WA_NUMBER + "?text=" + encodeURIComponent(pesan);
}

function afdholBrewTip(product) {
    if (product.id === "drip-bag") {
        return "Sobek kemasan, pasang di atas cangkir, lalu tuang air panas perlahan secara melingkar.";
    }
    if (product.category === "biji") {
        return "Giling sesaat sebelum diseduh agar aroma tetap segar. Cocok untuk V60, french press, atau mesin espresso.";
    }
    return "Seduh dengan air panas sekitar 90 sampai 95 derajat Celsius. Cocok untuk manual brew atau french press.";
}

function afdholRenderProductDetail() {
    var view = document.getElementById("khaikal_product_view");
    if (!view) return;

    var p = afdholGetProductFromUrl();

    // Kalau id produk tidak dikenal, tampilkan pesan ramah
    if (!p) {
        view.innerHTML =
            '<div class="khaikal_detail_empty">' +
            '<h1 class="khaikal_detail_title">Produk tidak ditemukan</h1>' +
            '<p>Produk yang kamu cari belum tersedia atau tautannya salah.</p>' +
            '<a href="store.html" class="khaikal_btn khaikal_btn_primary">Kembali ke Coffee Store</a>' +
            '</div>';
        return;
    }

    // Judul tab dan breadcrumb mengikuti nama produk
    document.title = p.name + " | Afdhol Coffee Shop";
    var crumb = document.getElementById("khaikal_crumb_name");
    if (crumb) crumb.textContent = p.name;

    var chips = p.taste.split(",").map(function (t) {
        return '<span class="khaikal_detail_chip">' + t.trim() + '</span>';
    }).join("");

    var html = "";
    html += '<div class="khaikal_detail_grid">';

    // --- Kolom foto ---
    html += '  <div class="khaikal_detail_gallery">';
    html += '    <div class="khaikal_detail_photo">';
    html += '      <span class="khaikal_product_placeholder"><img src="assets/images/logo.png" alt=""></span>';
    html += '      <img class="khaikal_product_photo" src="assets/images/produk/' + p.image + '" alt="' + p.name + '" onerror="this.remove()">';
    html += '      <span class="khaikal_product_badge">' + p.type + '</span>';
    html += '    </div>';
    html += '    <p class="khaikal_detail_caption">Foto dan harga produk bersifat contoh.</p>';
    html += '  </div>';

    // --- Kolom informasi ---
    html += '  <div class="khaikal_detail_info">';
    html += '    <p class="khaikal_product_cat">' + afdholCategoryLabel(p.category) + '</p>';
    html += '    <h1 class="khaikal_detail_title">' + p.name + '</h1>';
    html += '    <p class="khaikal_detail_price">' + afdholFormatRupiah(p.price) + '</p>';
    html += '    <p class="khaikal_detail_desc">' + p.desc + '</p>';

    html += '    <p class="khaikal_detail_label">Karakter Rasa</p>';
    html += '    <div class="khaikal_detail_chips">' + chips + '</div>';

    html += '    <table class="khaikal_detail_table">';
    html += '      <tr><th>Kategori</th><td>' + afdholCategoryLabel(p.category) + '</td></tr>';
    html += '      <tr><th>Jenis</th><td>' + p.type + '</td></tr>';
    html += '      <tr><th>Berat</th><td>' + p.weight + '</td></tr>';
    html += '      <tr><th>Penyajian</th><td>' + afdholBrewTip(p) + '</td></tr>';
    html += '    </table>';

    html += '    <p class="khaikal_detail_label">Jumlah</p>';
    html += '    <div class="khaikal_detail_buy">';
    html += '      <div class="khaikal_qty">';
    html += '        <button type="button" class="khaikal_qty_btn" id="khaikal_qty_minus" aria-label="Kurangi jumlah">&minus;</button>';
    html += '        <span class="khaikal_qty_value" id="khaikal_qty_value">1</span>';
    html += '        <button type="button" class="khaikal_qty_btn" id="khaikal_qty_plus" aria-label="Tambah jumlah">+</button>';
    html += '      </div>';
    html += '      <p class="khaikal_detail_total">Total: <strong id="khaikal_detail_total">' + afdholFormatRupiah(p.price) + '</strong></p>';
    html += '    </div>';

    html += '    <div class="khaikal_detail_actions">';
    html += '      <a href="' + afdholWaLinkQty(p, 1) + '" id="khaikal_buy_btn" class="khaikal_btn khaikal_btn_primary" target="_blank" rel="noopener">Beli via WhatsApp</a>';
    html += '      <a href="store.html" class="khaikal_btn khaikal_btn_outline">Kembali ke Store</a>';
    html += '    </div>';
    html += '    <p class="khaikal_detail_note">Harga dan ketersediaan dapat berubah. Konfirmasi dilakukan lewat WhatsApp.</p>';
    html += '  </div>';
    html += '</div>';

    view.innerHTML = html;

    // --- Pilihan jumlah: tombol minus dan plus ---
    var qty = 1;
    var qtyValue = document.getElementById("khaikal_qty_value");
    var totalText = document.getElementById("khaikal_detail_total");
    var buyBtn = document.getElementById("khaikal_buy_btn");

    function updateQty(newQty) {
        if (newQty < 1) newQty = 1;
        if (newQty > 20) newQty = 20;
        qty = newQty;
        qtyValue.textContent = qty;
        totalText.textContent = afdholFormatRupiah(p.price * qty);
        buyBtn.setAttribute("href", afdholWaLinkQty(p, qty));
    }

    document.getElementById("khaikal_qty_minus").addEventListener("click", function () {
        updateQty(qty - 1);
    });
    document.getElementById("khaikal_qty_plus").addEventListener("click", function () {
        updateQty(qty + 1);
    });
}

function afdholRenderRelated() {
    var grid = document.getElementById("khaikal_related_grid");
    if (!grid) return;

    var current = afdholGetProductFromUrl();
    var others = khaikal_products.filter(function (p) {
        return !current || p.id !== current.id;
    });

    // Utamakan produk yang kategorinya sama
    if (current) {
        others.sort(function (a, b) {
            var sa = a.category === current.category ? 0 : 1;
            var sb = b.category === current.category ? 0 : 1;
            return sa - sb;
        });
    }

    var html = "";
    others.slice(0, 3).forEach(function (p) {
        var detailUrl = "product.html?id=" + p.id;
        html += '<article class="khaikal_product_card">';
        html += '  <a href="' + detailUrl + '" class="khaikal_product_media">';
        html += '    <span class="khaikal_product_placeholder"><img src="assets/images/logo.png" alt=""></span>';
        html += '    <img class="khaikal_product_photo" src="assets/images/produk/' + p.image + '" alt="' + p.name + '" loading="lazy" onerror="this.remove()">';
        html += '    <span class="khaikal_product_badge">' + p.type + '</span>';
        html += '  </a>';
        html += '  <div class="khaikal_product_info">';
        html += '    <p class="khaikal_product_cat">' + afdholCategoryLabel(p.category) + '</p>';
        html += '    <h3 class="khaikal_product_name"><a href="' + detailUrl + '">' + p.name + '</a></h3>';
        html += '    <p class="khaikal_product_meta">' + p.weight + '</p>';
        html += '    <p class="khaikal_product_price">' + afdholFormatRupiah(p.price) + '</p>';
        html += '    <div class="khaikal_product_actions">';
        html += '      <a href="' + detailUrl + '" class="khaikal_btn_small khaikal_btn_small_line">Detail</a>';
        html += '      <a href="' + afdholWaLink(p) + '" class="khaikal_btn_small khaikal_btn_small_fill" target="_blank" rel="noopener">Beli</a>';
        html += '    </div>';
        html += '  </div>';
        html += '</article>';
    });

    grid.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
    afdholRenderProductDetail();
    afdholRenderRelated();
});


// =====================================================
// TAHAP 11: FORMULIR KONTAK + TOMBOL WHATSAPP MENGAMBANG
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // ---------- 1. TOMBOL WHATSAPP MENGAMBANG (semua halaman) ----------
    var floatBtn = document.createElement("a");
    floatBtn.className = "khaikal_wa_float";
    floatBtn.setAttribute("href", "https://wa.me/" + AFDHOL_WA_NUMBER + "?text=" +
        encodeURIComponent("Halo Afdhol, saya ingin bertanya."));
    floatBtn.setAttribute("target", "_blank");
    floatBtn.setAttribute("rel", "noopener");
    floatBtn.setAttribute("aria-label", "Chat Afdhol via WhatsApp");
    floatBtn.innerHTML =
        '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>' +
        '<span class="khaikal_wa_float_text">Chat</span>';
    document.body.appendChild(floatBtn);

    // ---------- 2. FORMULIR KONTAK + VALIDASI ----------
    var form = document.getElementById("khaikal_contact_form");
    if (!form) return;

    var fName = document.getElementById("khaikal_field_name");
    var fEmail = document.getElementById("khaikal_field_email");
    var fPhone = document.getElementById("khaikal_field_phone");
    var fTopic = document.getElementById("khaikal_field_topic");
    var fMessage = document.getElementById("khaikal_field_message");
    var counter = document.getElementById("khaikal_message_counter");
    var successBox = document.getElementById("khaikal_form_success");

    function setError(field, errorId, message) {
        var errorEl = document.getElementById(errorId);
        errorEl.textContent = message;
        if (message) {
            field.classList.add("khaikal_field_invalid");
        } else {
            field.classList.remove("khaikal_field_invalid");
        }
        return message === "";
    }

    function checkName() {
        var v = fName.value.trim();
        if (v === "") return setError(fName, "khaikal_error_name", "Nama wajib diisi.");
        if (v.length < 3) return setError(fName, "khaikal_error_name", "Nama minimal 3 huruf.");
        return setError(fName, "khaikal_error_name", "");
    }

    function checkEmail() {
        var v = fEmail.value.trim();
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (v === "") return setError(fEmail, "khaikal_error_email", "Email wajib diisi.");
        if (!pattern.test(v)) return setError(fEmail, "khaikal_error_email", "Format email belum benar, contoh: nama@email.com");
        return setError(fEmail, "khaikal_error_email", "");
    }

    function checkPhone() {
        var v = fPhone.value.replace(/[\s\-]/g, "");
        if (v === "") return setError(fPhone, "khaikal_error_phone", "");   // opsional
        var pattern = /^(\+62|62|0)8[0-9]{8,12}$/;
        if (!pattern.test(v)) return setError(fPhone, "khaikal_error_phone", "Nomor tidak valid, contoh: 081234567890");
        return setError(fPhone, "khaikal_error_phone", "");
    }

    function checkTopic() {
        if (fTopic.value === "") return setError(fTopic, "khaikal_error_topic", "Pilih salah satu topik.");
        return setError(fTopic, "khaikal_error_topic", "");
    }

    function checkMessage() {
        var v = fMessage.value.trim();
        if (v === "") return setError(fMessage, "khaikal_error_message", "Pesan wajib diisi.");
        if (v.length < 10) return setError(fMessage, "khaikal_error_message", "Pesan minimal 10 karakter.");
        return setError(fMessage, "khaikal_error_message", "");
    }

    // Validasi langsung saat pengguna selesai mengisi kolom
    fName.addEventListener("blur", checkName);
    fEmail.addEventListener("blur", checkEmail);
    fPhone.addEventListener("blur", checkPhone);
    fTopic.addEventListener("change", checkTopic);
    fMessage.addEventListener("blur", checkMessage);

    // Penghitung huruf pada kolom pesan
    fMessage.addEventListener("input", function () {
        counter.textContent = fMessage.value.length + " / 500";
    });

    // Saat tombol kirim ditekan
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        successBox.classList.remove("khaikal_form_success_show");

        // Jalankan semua pemeriksaan (tanpa berhenti di yang pertama)
        var results = [checkName(), checkEmail(), checkPhone(), checkTopic(), checkMessage()];
        var allValid = results.every(function (r) { return r; });

        if (!allValid) {
            var firstInvalid = form.querySelector(".khaikal_field_invalid");
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // Susun pesan WhatsApp
        var lines = [];
        lines.push("Halo Afdhol, saya " + fName.value.trim() + ".");
        lines.push("");
        lines.push("Topik: " + fTopic.value);
        lines.push("Email: " + fEmail.value.trim());
        if (fPhone.value.trim() !== "") {
            lines.push("WhatsApp: " + fPhone.value.trim());
        }
        lines.push("");
        lines.push("Pesan:");
        lines.push(fMessage.value.trim());

        var url = "https://wa.me/" + AFDHOL_WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
        window.open(url, "_blank", "noopener");

        // Tampilkan pesan sukses dan kosongkan formulir
        successBox.classList.add("khaikal_form_success_show");
        form.reset();
        counter.textContent = "0 / 500";
    });
});
