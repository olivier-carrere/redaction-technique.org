Produits et versions
====================

{% for prod in product %}
{{ prod | capitalize }}
{% for c in prod %}-{% endfor %}
   {% for ver in version %}
- {{ ver }}
   {% endfor %}
{% endfor %}
