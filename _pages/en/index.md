---
layout: archive
permalink: /en/
title: "Articles"
description: "English editions of qscqesze's writing on engineering, mathematics, games, travel, and history."
lang: en
translation_url: /
---

<p class="archive__intro">Notes on travel, engineering, games, and ideas that take time to clarify.</p>

{% assign english_posts = site.en_posts | sort: 'date' | reverse %}
{% for post in english_posts %}
  {% include archive-single.html show_teaser=true %}
{% endfor %}

{% if english_posts.size == 0 %}
  <p>English editions are being prepared. Please check back soon.</p>
{% endif %}
