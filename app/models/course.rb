class Course
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  # field <name>, :type => <type>, :default => <value>
  field :title, :type => String
  field :slug, :type => String
  field :description, :type => String
  field :image_url, :type => String

  has_and_belongs_to_many :lessons
  belongs_to :account
  has_and_belongs_to_many :prerequisites, class_name: "Course", inverse_of: nil
  has_and_belongs_to_many :follow_ons, class_name: "Course", inverse_of: nil
  belongs_to :category

  validates_presence_of :title, :message => "Supply a title for the course you ding-dong"
  validates_presence_of :slug, :message => "The slug gets filled in for you, just leave it there!"
  validates_presence_of :description, :message => "Put a description in doofus"
  validates_presence_of :category
  validates_uniqueness_of :title
  validates_uniqueness_of :slug

  index({ slug: 1 }, { unique: true, name: "slug_index" })

  def get_lesson(index)
    Lesson.find lesson_ids[index]
  end

  def get_lesson_index(current_lesson)
    lesson_ids.index(current_lesson.id)
  end

  def get_first_lesson
    Lesson.find( lesson_ids[0] )
  end

  def get_last_lesson
    Lesson.find( lesson_ids[lesson_ids.length - 1] )
  end

  def get_next_lesson(current_lesson)
    current_index = lesson_ids.index(current_lesson.id)

    if (lesson_ids.length > current_index + 1)
      Lesson.find( lesson_ids[current_index + 1] )
    else
      nil
    end
  end

  def get_prev_lesson(current_lesson)
    current_index = lesson_ids.index(current_lesson.id)

    if (current_index - 1 >= 0)
      Lesson.find( lesson_ids[current_index - 1] )
    else
      nil
    end
  end

  def get_lessons_in_order
    result = []

    lesson_ids.each do |lesson_id|
      result << Lesson.find(lesson_id)
    end

    result
  end

  # You can define indexes on documents using the index macro:
  # index :field <, :unique => true>

  # You can create a composite key in mongoid to replace the default id using the key macro:
  # key :field <, :another_field, :one_more ....>
end
