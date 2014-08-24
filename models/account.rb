class Account
  include Mongoid::Document
  attr_accessor :password, :password_confirmation

  # Fields
  field :name,             :type => String
  field :surname,          :type => String
  field :bio,              :type => String
  field :email,            :type => String
  field :crypted_password, :type => String
  field :role,             :type => String
  field :avatar,           :type => String
  field :experience,       :type => Integer

  # Validations
  validates_presence_of     :email, :role, :name, :surname
  validates_presence_of     :password,                   :if => :password_required
  validates_presence_of     :password_confirmation,      :if => :password_required
  validates_length_of       :password, :within => 4..40, :if => :password_required
  validates_confirmation_of :password,                   :if => :password_required
  validates_length_of       :email,    :within => 3..100
  validates_uniqueness_of   :email,    :case_sensitive => false
  validates_format_of       :email,    :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_format_of       :role,     :with => /[A-Za-z]/

  has_many :reported_comments
  has_many :comments
  has_many :steps
  has_many :lessons
  has_many :courses
  has_many :completed_steps
  has_many :completed_lessons
  has_many :completed_courses
  has_many :started_courses
  has_many :shared_images

  # Callbacks
  before_save :encrypt_password, :if => :password_required

  ##
  # This method is for authentication purpose.
  #
  def self.authenticate(email, password)
    account = where(:email => /#{Regexp.escape(email)}/i).first if email.present?
    account && account.has_password?(password) ? account : nil
  end


  def levels()
    {
        0 => 0,
        1 => 100,
        2 => 200,
        3 => 500,
        4 => 1000,
        5 => 2000
    }
  end

  def get_level()

    highest = 0

    if (experience < levels[1])
        return 0
    end

    levels.each do |key, xp|
        highest = key
        if (experience > xp)
            return key 
        end
    end

    return highest

  end

  def needed_xp()
    current_level = get_level
    needed_xp = levels[current_level + 1]

    return needed_xp
  end

  def percent_of_level()
    current_level = get_level
    current_xp = experience
    old_needed_xp = levels[current_level]
    needed_xp = levels[current_level + 1]
    if (needed_xp - old_needed_xp) != 0
        percent = ((current_xp - old_needed_xp) * 1.0 / (needed_xp - old_needed_xp))*100
    else
        percent = 100
    end
  end


  def update_progress(course, lesson, step)

    started_course = StartedCourse.where(:course => course).first
    if started_course.nil?
      started_course = StartedCourse.new(:course => course, :lesson => lesson, :step => step, :account => self)
      started_courses << started_course
      save
    else
      started_course.lesson = lesson
      started_course.step = step
      started_course.save
    end

  end

  def complete_step(step)

    if !has_completed_step? step
      completed_step = CompletedStep.new(:step => step, :account => self)
      completed_steps << completed_step
      save
    end
    
  end

  def complete_lesson(lesson)

    if !has_completed_lesson? lesson
      completed_lesson = CompletedLesson.new(:lesson => lesson, :account => self)
      completed_lessons << completed_lesson
      save
    end
    
  end

  def complete_course(course)

    if !has_completed_course? course

      started_course = StartedCourse.where(:course => course, :account => self).first

      if !started_course.nil?
        started_course.delete
      end

      completed_course = CompletedCourse.new(:course => course, :account => self)
      completed_courses << completed_course
      save
    end
    
  end

  def has_completed_step?(step)
    !get_completed_step(step).nil?
  end

  def has_completed_lesson?(lesson)
    completed_lessons.where(:lesson => lesson).first
  end

  def has_completed_course?(course)
    completed_courses.where(:course => course).first
  end

  def get_completed_step(step)
    completed_steps.where(:step => step).first
  end

  def get_completed_lesson(lesson)
    completed_lessons.where(:lesson => lesson).first
  end

  def get_completed_course(course)
    completed_courses.where(:course => course).first
  end






  ##
  # This method is used by AuthenticationHelper.
  #
  def self.find_by_id(id)
    find(id) rescue nil
  end

  def has_password?(password)
    ::BCrypt::Password.new(crypted_password) == password
  end

  private

  def encrypt_password
    self.crypted_password = ::BCrypt::Password.create(self.password)
  end

  def password_required
    crypted_password.blank? || self.password.present?
  end
end
