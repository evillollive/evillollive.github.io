// Click-to-play YouTube: the video loads only when the visitor presses play,
// so every play is visitor-started and counts as a view on the channel.
document.querySelectorAll('.player[data-youtube]').forEach(function (box) {
  var btn = box.querySelector('.play');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var id = box.getAttribute('data-youtube');
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1&cc_load_policy=1&cc_lang_pref=en';
    f.title = (box.getAttribute('data-title') || 'Video') + ' (video)';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.allowFullscreen = true;
    box.appendChild(f);
    btn.remove();
    f.focus();
  });
});

// Contact brief: builds an email the visitor reviews and sends. Nothing is stored.
var form = document.getElementById('brief');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ''; };
    var note = form.querySelector('.form-note');
    var nameField = form.elements.name;
    if (!v('name')) {
      note.hidden = false;
      note.id = 'form-note';
      note.textContent = 'Please add your name so I know who to reply to.';
      nameField.setAttribute('aria-invalid', 'true');
      nameField.setAttribute('aria-describedby', 'form-note');
      nameField.focus();
      return;
    }
    nameField.removeAttribute('aria-invalid');
    nameField.removeAttribute('aria-describedby');
    var lines = [
      'Name: ' + v('name'),
      v('company') && 'Company: ' + v('company'),
      'Making: ' + v('type'),
      v('budget') && 'Budget: ' + v('budget'),
      v('location') && 'Location: ' + v('location'),
      v('timing') && 'Timing: ' + v('timing'),
      '',
      v('about')
    ].filter(function (l) { return l !== '' && l !== false; });
    var subject = 'Project: ' + v('type') + (v('company') ? ' for ' + v('company') : '');
    var href = 'mailto:' + form.getAttribute('data-email') +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    note.hidden = false;
    note.textContent = 'Your email app should open with the brief filled in. If it doesn’t, write to ' + form.getAttribute('data-email') + '.';
    window.location.href = href;
  });
}
