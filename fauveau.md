- TO DOs:

The most urgent: integrate JCrop with paperclip


1. review the various FIXME and FIX ME
2. re-order the shared/aktion_article_portrait folder re. recommandations (recommandations are now managed by the special controller "linkings_controller" and views "linkings")
3. re-factor the admin bar partial/layout logic
4. re-factor the article/aktion show, edit, new, and forms to abstract common chunks of code
5. refactor and rename external_links_controller -- it is more an external_linking controller
6. refactor the external linking logic to match that of the internal_linkings (fully externalized into their own views)

7. namespacing:
(a) the admin interface
(b) the JSON API
