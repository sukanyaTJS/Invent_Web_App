# invent_web

<% for (var user = 0; user < (assets[assets.length-1]).length; user++) { %>
                                    <ul type="none" class="d-flex flex-direction-column align-items-center">
                                      <li> <%= assets[assets.length-1][user].name  %> : <%= assets[assets.length-1][user].id  %></li>
                                    </ul>
                                    <% } %>