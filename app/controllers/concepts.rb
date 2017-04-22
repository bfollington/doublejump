Doublejump::App.controllers :concepts, :cache => true do

  layout :thesis

  get :clear, :map => '/api/clear_system' do

      users_to_delete = []

      Account.all.each do |account|
          if account.role != "admin"
            users_to_delete << account
            account.delete
          end
      end

      projects_to_delete = []

      Project.all.each do |project|
          if project.account.nil?
              projects_to_delete << project
              project.delete
          end
      end

      topic_scores_to_delete = []

      TopicScore.all.each do |score|
          if score.project.nil?
              topic_scores_to_delete << score
              score.delete
          end
      end

      transitions_to_delete = []

      Transition.all.each do |trans|
          transitions_to_delete << trans
          trans.delete
      end

      comments_to_delete = []

      Content.all.each do |content|

          content.comments.each do |comment|
              if comment.account.nil?
                  comments_to_delete << comment
                  comment.delete
              end
          end

      end



      send_json({projects_removed: projects_to_delete, users_removed: users_to_delete, topic_scores_removed: topic_scores_to_delete, transitions_removed: transitions_to_delete, comments_removed: comments_to_delete})

  end

  get :any, :map => '/*' do

    render 'thesis/page'
  end



end
