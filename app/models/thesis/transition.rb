class Transition
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  belongs_to :from, class_name: "LearningModule"
  belongs_to :to, class_name: "LearningModule"
end
